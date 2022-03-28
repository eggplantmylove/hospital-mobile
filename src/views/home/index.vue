<template>
  <div>
    <!-- <van-grid :column-num="2" :center="false">
       <van-grid-item v-for="(item, index) in topNav" :key="index" :to="item.path" >
                <div class="top-box">
                    <div class="round-box flex-center" :style="{background: item.color}">
                        <i class="iconfont" :class="item.icon"></i>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </van-grid-item>  
    </van-grid>

    <van-swipe :autoplay="3000" indicator-color="#FF4C68" style="height: 20vh">
      <van-swipe-item v-for="(item, index) in carousel" :key="index">
        <img v-lazy="item.src" style="width: 100%; height: 100%" />
      </van-swipe-item>
    </van-swipe> -->

    <div class="my-top">
      <span class="txt1">{{ hospital_info.name }}</span>
      <div class="outer2 flex-row">
        <!-- <div class="hospital-level">
          <div class="section1 flex-col"></div>
          <span class="txt2">三甲医院</span>
        </div> -->
        <div class="hospital-level">
          <div class="section1 flex-col"></div>
          <span class="txt2">互联网医院</span>
        </div>
      </div>

      <div class="card-info">
        <div class="outer4 flex-col justify-between">
          <div class="flex-row justify-between">
            <span class="name">{{ patObjectStore.real_name }}</span>
            <div class="change-button flex-col" @click="show = true">
              <span>切换</span>
              <div class="wrap2 flex-col"></div>
            </div>
          </div>
          <span class="card_no"
            >{{ patObjectStore.card_no }}&nbsp;|&nbsp;就诊卡</span
          >
        </div>
        <div class="outer6 flex-col"></div>
      </div>
    </div>

    <div>
      <div class="content-title">
        <h4>就医服务</h4>
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          v-for="(item, index) in myService"
          :key="index"
          :to="item.path"
        >
          <div
            class="round-box flex-center"
            :style="{
              background: `linear-gradient(to bottom, ${item.topColor}, ${item.bottomColor})`,
            }"
          >
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span style="font-size: 12px; margin-top: 3px">{{ item.title }}</span>
        </van-grid-item>
      </van-grid>
      <!-- <van-grid :column-num="4" :border="false">
        <van-grid-item
          v-for="(item, index) in noService"
          :key="index"
          @click="notService"
        >
          <div
            class="round-box flex-center"
            :style="{
              background: `linear-gradient(to bottom, ${item.topColor}, ${item.bottomColor})`,
            }"
          >
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span style="font-size: 12px; margin-top: 3px">{{ item.title }}</span>
        </van-grid-item>
      </van-grid> -->
    </div>
    <van-popup v-model="show" position="bottom" @closed="onClosed">
      <van-picker
        :columns="columns"
        show-toolbar
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { patList, patLogin, getOpenid, hospitalOne } from "../../api/api";
import { mapGetters } from "vuex";
import store from "../../store/index";
import { Toast } from "vant";
export default {
  name: "index",
  data() {
    return {
      // myNav:this.$router.options.routes.find(item => item.children.path === '/home').children,
      // 顶部导航
      topNav: [
        {
          title: "在线预约",
          content: "看病提前预约",
          icon: "icon-yuyuexinxi",
          color: "#FA525A",
          path: "/hospital/dept/app",
        },
        {
          title: "门诊缴费",
          content: "移动支付医疗费",
          icon: "icon-zhifubao",
          color: "#4CBDFA",
          path: "/pending-list",
        },
        {
          title: "今日挂号",
          content: "解决排队烦恼",
          icon: "icon-jia",
          color: "#55D323",
          path: "/hospital/dept/reg",
        },
        {
          title: "住院缴费",
          content: "快速报销医疗费",
          icon: "icon-baoxiao",
          color: "#6435FA",
          path: "/hospitalization-list",
        },
      ],
      // 我的服务
      myService: [
        {
          title: "在线绑卡",
          icon: "icon-bangding",
          topColor: "#A551FE",
          bottomColor: "#552FF9",
          path: "/card-list",
        },
        {
          title: "在线预约",
          icon: "icon-order",
          topColor: "#FA525A",
          bottomColor: "#552FF9",
          path: "/hospital/dept/app",
        },
        {
          title: "今日挂号",
          icon: "icon-menzhenguahao",
          topColor: "#FA525A",
          bottomColor: "#552FF9",
          path: "/hospital/dept/reg",
        },

        // { title: '预约记录', icon: 'icon-tijian', topColor: '#F20FE5', bottomColor: '#FB243A' },
        {
          title: "门诊缴费",
          icon: "icon-menzhenjiaofei",
          topColor: "#4CBDFA",
          bottomColor: "#FF6E21",
          path: "/pending-list",
        },
        {
          title: "住院充值",
          icon: "icon-zhuyuan",
          topColor: "#FFC454",
          bottomColor: "#FF6D21",
          path: "/hospitalization-recharge",
        },
        {
          title: "检验查看",
          icon: "icon-report-fill",
          topColor: "#55D323",
          bottomColor: "#FA525A",
          path: "/lis",
        },
        {
          title: "核酸检测",
          icon: "icon-hesuanjiance",
          topColor: "#03f36e",
          bottomColor: "#e8e1e2",
          path: "/pending-hesuan",
        },

        // {
        //   title: "报告查看",
        //   icon: "icon-report-fill",
        //   topColor: "#55D323",
        //   bottomColor: "#FA525A",
        //   path: "/pacs",
        // },
      ],
      noService: [
        {
          title: "出院医嘱",
          icon: "icon-jiatingyisheng",
          topColor: "#A551FE",
          bottomColor: "#532EF9",
        },
        {
          title: "出院小结",
          icon: "icon-tijian",
          topColor: "#55D323",
          bottomColor: "#4CBDFA",
        },
        {
          title: "药物配送",
          icon: "icon-yao",
          topColor: "#FFC252",
          bottomColor: "#FF6E21",
        },
        {
          title: "检验查询",
          icon: "icon-jiatingyisheng",
          topColor: "#A551FE",
          bottomColor: "#532EF9",
        },
      ],
      // 轮播图
      carousel: [
        { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg" },
      ],
      patList: [],
      openid: "",
      icon_ewm: "icon-erweima",
      change: "icon-qiehuanchengshi",
      hospital_info: { name: "河池市第一人民医院" },
      show: false,
      columns: [],
      pat_list: [],
    };
  },
  computed: {
    ...mapGetters(["patObjectStore", "storePatList"]),
  },
  methods: {
    getPatList: async function () {
      console.log(this.storePatList)
      if (this.storePatList.length == 0) {
        let params = { openid: this.openid };
         await patList(params).then((res) => {
          this.pat_list = res.data.data;
          if (this.pat_list.length > 0) {
            if (this.pat_list.length == 1) {
              this.$store.dispatch("setPatObject", res.data.data[0]);
              return;
            } 
            
          } else {
            this.$router.replace("/card-add");
          } 
        });
      }else{
        this.pat_list = this.storePatList;
      } 
      this.pat_list.forEach((element) => {
        this.columns.push(element.real_name);
      });
      console.log(this.pat_list)
      if(this.pat_list.length>1){
          this.show = true;
      }
    },
    notService: function () {
      Toast("接口暂未开放");
    },
    getHospital() {
      let params = { id: window.localStorage.getItem("hospital_id") };
      hospitalOne(params).then((res) => {
        this.$store.dispatch("setHospitalObject", res.data.data);
      });
    },
    onClosed() {},
    onConfirm(value, index) {
      this.$store.dispatch("setPatObject", this.pat_list[index]);
      this.show = false;
    },
    onCancel() {},
  },
  mounted: function () {
    this.openid = window.localStorage.getItem("openid");
    this.getPatList();
    this.getHospital();
  },
};
</script>

<style scoped lang="less">
/deep/ .van-grid-item {
}

.top-box {
  display: flex;
  align-items: center;
  padding-left: 10px;
  .round-box {
    margin-right: 15px;
  }
  .text {
    p {
      font-size: 14px;
      color: #999;
    }
  }
}

.content-title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #fff;
  p {
    font-size: 14px;
  }
}

.round-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  .iconfont {
    font-size: 26px;
    color: #fff;
  }
}
.card {
  display: flex;
  justify-content: space-between;
  margin: 2px 2px 2px;
  padding: 2px;
  border-radius: 10px;
  background: #fff;

  > div {
    font-size: 14px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #333;
    margin: 10px 0;
    > span {
      margin: 2px 2px 2px;
    }
  }
  .label2 {
    font-size: 13px;
    line-height: 32px;
    background: orange;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding: 0 2em;
    -webkit-transform-origin: left top;
    -moz-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: translate(29.29%, 100%) rotate(-45deg);
    -moz-transform: translate(29.29%, 100%) rotate(-45deg);
    transform: translate(29.29%, 100%) rotate(-45deg);
    text-indent: 0;
  }
}
.my-top {
  padding-top: 20px;
  height: 180px;
  background: url(../../assets/ps8za1e7jimvv1v2t9c5mf3ub3khntgldi3ydf0vh40au4n298a8e66de-67b4-4869-bbf2-d35cc06f44b8.png)
    -2px -88px no-repeat;
  background-size: cover;
  position: relative;
  background-color: #fff;
}
.txt1 {
  width: 297px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-family: NotoSansHans-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 24px;
  display: block;
  margin: 4px 0 0 47px;
}
.outer2 {
  width: 324px;
  height: 27px;
  margin: 27px 0 0 49px;
}
.hospital-level {
  display: flex;
  margin: 0 0 0 5px;
}
.section1 {
  width: 19px;
  height: 16px;
  background: url(../../assets/pstlkci2ojbidg3nmi8j04ndw9tnvcxr4jwqyaa6ziu23xr004f02e4-0f36-4015-b2f2-6c98080dda8a.png) -1px -2px
    no-repeat;
  background-size: cover;
}

.txt2 {
  margin-left: 20px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: NotoSansHans-Medium;
  text-align: left;
  white-space: nowrap;
  display: block;
  margin: 0px 0 0 4px;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.card-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 93px;
  margin: 30px 0 0 50px;
  > span {
    color: rgba(90, 65, 41, 1);
    font-size: 42px;
    font-family: NotoSansHans-Bold;
  }
  .name {
    color: rgba(90, 65, 41, 1);
    font-size: 20px;
    font-family: NotoSansHans-Bold;
    text-align: left;
    white-space: nowrap;
    display: block;
  }
  .card_no {
    color: rgba(90, 65, 41, 1);
    font-size: 16px;
    font-family: NotoSansHans-Bold;
    text-align: left;
    white-space: nowrap;
    display: block;
  }
  .change-button {
    background-color: rgba(226, 226, 226, 1);
    border-radius: 10px;
    margin: 0 0 0 5px;
    padding: 5px;
    > span {
      font-size: 14px;
      font-family: NotoSansHans-Bold;
      color: rgba(90, 65, 41, 1);
    }
  }
}
.outer4 {
  width: 310px;
  height: 93px;
}

.outer6 {
  width: 29px;
  height: 29px;
  background: url(../../assets/psnhyxr9ckv6rms4ixvlphnmc7d4mquxr4qe019txoyhtcsor3c4c823e-e9cc-4a01-9acb-384aba2319ee.png) -2px -1px
    no-repeat;
  background-size: cover;
  margin: 0px 30px 0px 0px;
}
</style>
