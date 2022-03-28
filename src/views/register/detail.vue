<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)">
      <h4 slot="title" style="color: #fff">挂号详情</h4>
    </van-nav-bar>
        <h4 style="margin: 20px 10px 10px">就诊信息</h4>
        <van-list class="doctor">
            <van-cell>
                <div class="flex">
                    <p>门诊医院</p>
                    <p>{{resObjectStore.hospital_name}}</p>
                </div>
            </van-cell>
            <van-cell>
                <div class="flex"> 
                          <p>医生：</p> 
                        <p>{{resObjectStore.doctor_name}}({{resObjectStore.doctor_title}})</p>
                         
                </div>
            </van-cell>
            <van-cell>
                <div class="flex">
                    <p>门诊科室</p>
                    <div>
                        <p>{{resObjectStore.dept_name}}</p> 
                    </div>
                </div>
            </van-cell>
            <van-cell>
                <div class="flex">
                    <p>就诊时间</p>
                    <p>{{resObjectStore.resource_date}} {{resObjectStore.resource_time}}</p>
                </div>
            </van-cell>
            <van-cell>
                <div class="flex">
                    <p>费用</p>
                    <p>{{$floatFormatter.float_format(resObjectStore.cost)}}</p>
                </div>
            </van-cell>
            <van-cell>
                <div class="flex">
                    <p>时段</p>
                    <p>{{ resObjectStore.res_type|filterResType}}</p>
                </div>
            </van-cell>
             <van-cell>
                <div class="flex">
                    <p>就诊地址</p>
                    <p>{{ resObjectStore.visit_address}}</p>
                </div>
            </van-cell>
            <!-- <van-cell>
                <div class="flex">
                    <p>挂号费</p>
                    <p>&yen;99</p>
                </div>
            </van-cell> -->
        </van-list>
        <div class="tips">
            <h4>温馨提示</h4>
            <p>就诊前请带好您的身份证、社保卡，请保留好您在线预约取票号码</p>
        </div>
  </div>
</template>

<script>
import { studentCostYearList } from "../../api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      kou_item: [],
      fa_item: [],
    };
  },
  filters:{
      filterResType(status){
      const statusMap = {
        1: "上午",
        2: "下午",
        3: "晚上",
        4: "全天" 
      };
      return statusMap[status];
      },
  },
  computed: { 
      ...mapGetters(['resObjectStore','patObjectStore'])
  },
  methods: {
 
  
  },
  mounted() { 
    // this.init();
    // this.queryCostList();
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
  margin: 10px 10px 10px;
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
