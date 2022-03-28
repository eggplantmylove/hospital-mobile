<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)">
      <h4 slot="title" style="color: #fff">挂号记录</h4>
    </van-nav-bar>
    <!-- <van-cell title="选择发放年月" v-model="queryTitle" @click="setQueryParam">

      <template #right-icon> 
        <van-icon name="arrow-down" />
      </template>
    </van-cell> -->
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" /> -->
    <!-- <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup> -->
    <div class="box">
      <div class="card">
        <h4>就诊卡信息</h4>

        <van-icon
          name="exchange"
          style="float: right; margin-top: -22px"
          @click="changeUser"
        />
        <div class="user-info">
          <span>就诊人：{{ patObjectStore.real_name }}</span>

          <span>就诊卡号：{{ patObjectStore.card_no }}</span>
        </div>
        <!-- <div class="statistics">
                    <div>
                        <p class="number">2</p>
                        <p>我的病例</p>
                    </div>
                    <div>
                        <p class="number">1</p>
                        <p>治疗方案</p>
                    </div>
                    <div>
                        <p class="number">3</p>
                        <p>配药单子</p>
                    </div>
                </div> -->
        <div class="mobile">
          <p>手机号</p>
          <p>{{ patObjectStore.phone }}</p>
        </div>
      </div>
    </div>
    <div style="margin-top: 10px">
      <div class="box">
        <div
          class="card"
          v-for="item in list"
          :key="item.taskNum"
          @click="go_detail(item)"
        >
          <!-- <h5>{{ item.dept_name }}{{ item.doctor_name }}</h5> -->
          
          <div class="user-info">
            <span>部门：{{item.dept_name}}</span>
            <span>医生：{{item.doctor_name}}</span>
            <span>费用：{{ $floatFormatter.float_format(item.cost)}}</span>
          </div>
          <div class="user-info">
            <span>日期：{{item.resource_date}}</span>
            <span>时间：{{item.resource_time}}</span> 
          </div>
          <div class="user-info">
            <span>状态：
              <!-- <van-tag :type="item.status|filterResTag">{{item.status|filterResStatus}}</van-tag> -->
               <van-tag 　type="success">预约成功</van-tag>
              </span>
            <span>时段：{{item.res_type|filterResType}}</span> 
          </div>
          
          <div class="user-info">
            <p></p>
            <i class="iconfont" :class="icon_class"></i>
            <p></p>
          </div>
          <!-- <div class="mobile">
          <p>状态</p>
          <p
            v-if="
              $floatFormatter.float_format(
                item.schYearNeedPayAmount - item.schYearHadPayAmount
              ) == 0
            "
          >
            <van-tag type="success">正常</van-tag>
          </p>
          <p
            v-if="
              $floatFormatter.float_format(
                item.schYearNeedPayAmount - item.schYearHadPayAmount
              ) < 0
            "
          >
            <van-tag type="primary">多缴</van-tag>
          </p>
          <p
            v-if="
              $floatFormatter.float_format(
                item.schYearNeedPayAmount - item.schYearHadPayAmount
              ) > 0
            "
          >
            <van-tag type="danger">欠费</van-tag>
          </p>
        </div> -->
        </div>
      </div>
      <van-empty description="没有信息" v-if="list.length == 0" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="patList"
          value-key="real_name"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getAppointmentList,patList } from "../../api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
      showPicker: true,
      icon_class: "icon-xiangxiazhankai",
      queryTitle: "",
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2055, 10, 1),
      currentDate: new Date(),
      patList:[],
      openid: "",
      params: {
      },
    };
  },
  computed: {
    //  total_money() {
    //   return this.list.reduce((acc, item) => {
    //     return acc + item.actualPayoff;
    //   }, 0);
    // },
    ...mapGetters(["patObjectStore"]),
  },
    filters:{
      filterResStatus(status){
      const statusMap = {
        0: "未付费",
        1: "已付费",
        2: "已退费",
        3: "已取消",
        4:"已就诊",
        5:"医生停诊"
      };
         return statusMap[status];
      },
      filterResType(status){
      const statusMap = {
        1: "上午",
        2: "下午",
        3: "晚上",
        4: "全天" 
      };
      return statusMap[status];
      },
      filterResTag(status){
       if(status==1){
          return "success";
       }
      return "primary";
      } 
  },
  methods: {
    queryAppointmentList() {
        this.params = this.patObjectStore; 
      getAppointmentList(this.params).then((res) => {
        if (res.data.data != null) {
          this.list = res.data.data ;
        } else {
          this.list = [];
        }
      }); 
      this.showPicker = false;
    },
    getPatList() {
      let params = { openid: this.openid };
      patList(params).then((res) => {
        this.patList = res.data.data;
      });
    },
    onConfirm(value) {
      this.$store.dispatch("setPatObject", value);
       this.queryAppointmentList();
      this.showPicker = false;
    },
    changeUser() {
        this.showPicker = true;  
    },

    // setQueryParam() {
    //   this.showPicker = true;
    // },
    // onConfirm(value) {
    //   this.params.grantYear = this.$dateFormatter.format(value, "yyyy");
    //   this.params.grantMonth = this.$dateFormatter.format(value, "MM");

    //   this.$store.dispatch("set_query_param", this.params);
    //   this.queryTitle = this.$dateFormatter.format(value, "yyyy-MM");
    //   this.queryWagesList();
    // },
    go_detail(item) {
      this.$store.dispatch("setDocres", item);
      this.$router.push({ path: `appointment-detail` });
    },
  },
  mounted() {
    // if(this.queryParam.grantYear!=undefined){
    //   this.queryTitle = this.queryParam.grantYear+"-"+this.queryParam.grantMonth;
    //   this.params = this.queryParam;
    // }else{
    //     this.queryTitle = this.$dateFormatter.format(new Date(), "yyyy-MM");
    // }
    this.openid = window.localStorage.getItem("openid");
    this.getPatList(); 
  },
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #316de0;
}

.van-hairline--bottom::after {
  border: none;
}

.card {
  margin: 0 10px 10px;
  padding: 10px;
  border-radius: 10px;
  background: #fff;

  > div {
    font-size: 14px;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    color: #333;
    margin: 10px 0;
  }

  .statistics {
    display: flex;
    justify-content: space-between;
    padding: 0 10px 10px;
    color: #333;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      .number {
        font-size: 24px;
      }
    }
  }

  .mobile {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #cdcdcd;
    color: #333;
  }
}

.doctor {
  background: #fff;

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .doctor-info {
    font-size: 12px;
    display: flex;
    flex-direction: column;
  }
}

.tips {
  margin: 10px;

  p {
    margin-top: 5px;
    font-size: 14px;
  }
}
</style>
