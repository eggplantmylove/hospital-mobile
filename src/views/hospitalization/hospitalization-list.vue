<template>
  <div>
    <van-sticky>
      <van-nav-bar
        style="background:#316DE0;"
        :border="false"
        left-arrow
        @click-left="$router.go(-1)"
      >
        <h4 slot="title" style="color: #fff">住院记录</h4>
      </van-nav-bar>
    </van-sticky>
    <div class="top">
      <div style="background: #316DE0;height: 130px"></div>
      <div style="background: #fff;height: 70px"></div>
      <div class="card">
        <!-- <div class="avatar-info">
                    <van-image src="https://cdn.vuetifyjs.com/images/john.jpg"
                               round
                               cover
                               width="50"
                               heigth="50"></van-image>
                    <div>
                        <h3>登录/注册</h3>
                        <p>登录注册后享受更多精彩内容</p>
                    </div>
        </div>-->
        <ul class="top-list">
          <template v-for="(item, index) in topList">
            <li :key="index">
              <div class="flex-center">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              <p>{{item.title}}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div>
      <h4 style="margin: 20px 10px 10px">住院记录</h4>
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item,index) in hospitalizationList" :key="index">
          <template #title>
            <div class="title">
              <div style="display: flex; flex-wrap: wrap">
                <p>姓名</p>
                <p>日期</p>
                <p>部门</p>
                <!-- <van-cell :title="item.title">{{item.item_money}}元</van-cell>  -->
              </div>
              <div style="display: flex">
                <p>{{item.real_name}}</p>
                <p>{{item.hospitalization_in_date}}</p>
                <p>{{item.dept_name}}</p>
                <!-- <van-cell :title="item.title">{{item.item_money}}元</van-cell>  -->
              </div>
            </div>
          </template>
          <ul class="card-list">
            <li>
              <div></div>
              <div class="content">
                <div style="color: #999;font-size: 14px">
                  <div>住院号：{{item.hospitalization_no}}</div>
                  <div>入院医生：{{item.doctor_name}}</div>
                  <div>费用：{{item.cost}}</div>
                  <div>已缴费用：{{item.paid_cost}}</div>
                </div>
                <div class="right-btn">
                  <van-button
                    type="info"
                    size="small"
                    @click="showRecharge(item.hospitalization_no)"
                  >押金充值</van-button>
                  <van-button
                    type="info"
                    size="small"
                    @click="hospitalDetail(item.hospitalization_no)"
                  >充值明细</van-button>
                </div>
              </div>
              <!-- <div style="margin-top: 5px">
                    <div class="tag">
                        <span>直购</span>
                        <span>满减</span>
                    </div>
              </div>-->
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- <div class="balance">
            <div>
                <div class="wallet-icon flex-center">
                    <i class="iconfont icon-qianbao"></i>
                </div>
                <div>
                    <h3>0.00</h3>
                    <p style="font-size: 12px">当前账户余额</p>
                </div>
            </div>
            <van-button color="#039DFF" round size="small">账户充值</van-button>
    </div>-->
    <van-action-sheet v-model="show" title="充值操作">
      <div class="content">
        <van-form @submit="hospitalRechreage">
          <van-field v-model="recharge_amount" name="充值金额" label="充值金额" placeholder="充值金额" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </van-action-sheet>

    <van-action-sheet v-model="detail_show" title="缴费详情">
    <div class="content">
         <van-cell v-for="(item,index) in rechargeList.list" :key="index" :title="item.createDate" :value="item.cash" />
    </div>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  mobileHospitalizaitonList,
  mobileHospitalizaitonDetail,
  hospitalizaitonRecharge
} from "../../api/api";
import { store } from "../../store/index";
import { mapGetters } from "vuex";
export default {
  name: "index",
  data() {
    return {
      topList: [
        { title: "预约记录", icon: "icon-jilu" },
        { title: "挂号记录", icon: "icon-jilu1" },
        { title: "缴费明细", icon: "icon-zizhujiaofei" },
        { title: "报告单", icon: "icon-zhuyuanbaogao" }
      ],
      middleList: [
        { title: "订单中心", icon: "icon-jilu", color: "#3694D8" },
        // {title: '个人信息', icon: 'icon-aixin', color: '#FA3232'},
        { title: "我的就诊卡", icon: "icon-order-manager", color: "#1BCC3B" },
        { title: "住院缴费", icon: "icon-order-manager", color: "#1BCC3B" },
        { title: "我的医生", icon: "icon-menzhenfuwukaobei", color: "#F62774" }
      ],
      activeNames: [],
      recharge_amount: 0,
      show: false,
      detail_show:false,
      hospitalizationList: [],
      rechargeList:[],
      recharge_hos_no: "",
      patInfo: { real_name: "", id_no: "", openid: "1321313" }
    };
  },
  mounted: function() {
    this.getHospitalizationList();
  },
  computed: {
    ...mapGetters(["resObjectStore", "patObjectStore", "hosObjectStore"])
  },
  methods: {
    getHospitalizationList: function() {
      let params = Object.assign(this.patObjectStore, {
        hospital_code: this.hosObjectStore.hospital_code
      });
      mobileHospitalizaitonList(params).then(res => {
        this.hospitalizationList = res.data.data;
      });
    },
    showRecharge: function(hospitalization_no) {
      this.show = true;
      this.recharge_hos_no = hospitalization_no;
    },
    hospitalDetail: function(hospitalization_no) {
      this.detail_show = true;
      let params = {
        hospitalization_no: hospitalization_no,
        hospital_code: this.hosObjectStore.hospital_code
      };
      mobileHospitalizaitonDetail(params).then(res => {
        this.rechargeList = res.data.data;
      });
      console.log(hospitalization_no);
    },
    onClickLeft: function() {},

    hospitalRechreage: function() {
      let data = {
        openid: window.localStorage.getItem("openid"),
        hospital_id: this.hosObjectStore.id,
        order_money: this.recharge_amount,
        merchant_user_id: this.patObjectStore.his_pat_id,
        merchant_ord_no: this.recharge_hos_no,
        name: this.patObjectStore.real_name
      };
      hospitalizaitonRecharge(data).then(res => { 
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: res.data.data.app_id, //公众号名称，由商户传入
            timeStamp: res.data.data.time_stamp, //时间戳，自1970年以来的秒数
            nonceStr: res.data.data.nonce_str, //随机串
            package: res.data.data.prepay_id,
            signType: res.data.data.sign_type, //微信签名方式：
            paySign: res.data.data.pay_sign //微信签名
          },
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
          }
        );
      });
    }
    // patAdd:function(){
    //     patAdd(this.patInfo).then(res=>{
    //         if(res.data.reccnt=='success'){
    //              this.show = false;
    //              this.getHospitalizationList();
    //         }
    //     })
    // }
  }
};
</script>

<style scoped lang="less">
.top {
  position: relative;
  background: #fff;
  .card {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 85%;
    height: 170px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0 10px rgba(225, 225, 225, 0.51);
    .avatar-info {
      display: flex;
      align-items: center;
      /deep/ .van-image {
        margin-right: 10px;
      }
      > div {
        p {
          font-size: 14px;
        }
      }
    }
    .top-list {
      display: flex;
      margin-top: 30px;
      > li {
        width: 25%;
        text-align: center;
        > div {
          width: 40px;
          height: 40px;
          margin: 0 auto;
          background: linear-gradient(#38bff4, #3765fc);
          border-radius: 50%;
          .iconfont {
            color: #fff;
            font-size: 26px;
          }
        }
        > p {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
  }
}
.balance {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #fff;
  > div {
    display: flex;
    align-items: center;
    .wallet-icon {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      background: #f2f2f2;
      .iconfont {
        color: #3789f9;
        font-size: 24px;
      }
    }
  }
}
ul {
  margin: 0 !important;
}

li {
  background: #fff;
}

.card-list li {
  margin-top: 10px;
  padding: 5px;
  list-style: none;
  background: #fff;
}

.card-list li .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-list li .tag span {
  border: 1px solid red;
  border-radius: 5px;
  color: red;
  font-size: 15px;
  margin-right: 5px;
}

.list {
  margin-top: 10px;
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: space-around;
}
.title p {
  display: flex;
  flex-grow: 1;
  width: 33%;
}
.right-btn {
  display: flex;
  flex-wrap: wrap;
}
.right-btn button {
  width: 100%;
  margin: 5px;
}
</style>
