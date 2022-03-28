<template>
  <div>
    <van-overlay :show="overlay_show"></van-overlay>
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title> 住院充值支付 </template>
    </van-nav-bar>
    <div>
      <van-cell-group title="个人信息">
        <van-cell title="姓名" :value="hospitalizationObjectStore.real_name" />
        <van-cell
          title="住院号"
          :value="hospitalizationObjectStore.hospitalization_no"
        />
        <van-cell
          title="住院日期"
          :value="hospitalizationObjectStore.hospitalization_in_date"
        />
        <van-cell title="床号" :value="hospitalizationObjectStore.bed_no" />
        <van-cell title="累计费用" :value="hospitalizationObjectStore.cost" />
        <van-cell title="余额" :value="hospitalizationObjectStore.balance" />
      </van-cell-group>
    </div>
    <div class="balance">
      <van-field
        v-model="orderInfo.order_money"
        name="充值金额"
        label-class="red_title"
        label="预交金额"
        placeholder="请输入预交金额"
        type="number"
        size="large"
      />
      <div style="margin: 16px">
        <van-button round block type="info" @click="payClick">提交</van-button>
      </div>
    </div>
    <div>
      <!-- <van-cell-group title="预缴信息">
        <van-cell title="充值时间" value="充值金额" />
         <van-list>
          <van-cell v-for="item in patientObject.recharge_list" :key="item" :title="item.recharge_date" :value="item.recharge_amount" />
        </van-list>
      </van-cell-group> -->
    </div>
    <!-- <div
      style="padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;word-spacing:5px;"
    >
      <h4>注意内容</h4>
      <p>一、输入身份证号或者输入住院号</p>
      <p>二、在返回的消息中输入姓名中*号部分进行确认</p>
      <p>三、输入充值金额点击充值</p>
    </div> -->
  </div>
</template>
 <style scoped lang="less">
/deep/ .red_title {
  color: #44a770;
}

/deep/ .van-nav-bar {
  background: #3372d0;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .btns {
    span {
      font-size: 16px;
      border: 1px solid #fff;
      padding: 2px 15px;
    }
    .active {
      background: #fff;
      color: #3372d0;
    }
  }
}
</style>
<script>
import {
  hospitalizaitonRecharge,
} from "../../api/api";
import { Dialog } from "vant"; 
import { store } from "../../store/index";
import { Toast } from "vant";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeNames: ["1"],
      pay_qr_no: "",
      info: {},
      ic_no: "",
      pat_name: "",
      check_name: "",
      confirm_name: "",
      loading:false,
      recharge_amount: 0,
      userObject: {
        cardNo: "",
        name: ""
      },
      showinfo: false,
      show: false,
      overlay_show: false,
      code: "",
      mpSendMessage: {},
      topList: [
        { title: "预约记录", icon: "icon-yuyuejilu", path: "appointment-list" },
        { title: "挂号记录", icon: "icon-guahaojilu", path: "register-list" },
        { title: "缴费明细", icon: "icon-mingxi2" },
        { title: "报告单", icon: "icon-report-fill" },
      ],
      orderInfo: {
        name: "",
        money: null,
        his_pat_id: "",
        mechant_ord_no: "",
        title: "",
        openid: "",
        pay_type: "HOSPITALIZATION",
        dept_id:'',
        patient_info_id:'',
        content: []
      }
    };
  },
  computed: {
    ...mapGetters(["hospitalizationObjectStore","hosObjectStore"])
  },
  methods: {
    payClick() {
      //  this.toastAlert(1)
      // this.$router.push("/subscribe")
      if (this.orderInfo.order_money != null) {
        let that = this;
        that.overlay_show = true;
        hospitalizaitonRecharge(this.orderInfo).then(res => {
          if (res.data.appId != null) {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: res.data.appId, //公众号名称，由商户传入
                timeStamp: res.data.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: res.data.nonceStr, //随机串
                package: res.data.prepay_id,
                signType: res.data.signType, //微信签名方式：
                paySign: res.data.paySign //微信签名
              },
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    console.log("@")
                }
                that.overlay_show = false;
              }
            );
          } else {
            Dialog({ message: res.data.message });
            that.overlay_show = false;
          }
        });
      } else {
        Dialog({ message: "请输入金额！" });
      }
    },
    //传入是否关注参数
     onClickLeft() {
        this.$router.back(-1)
      },
  },

  mounted() { 
    this.orderInfo.openid = window.localStorage.getItem("openid"); 
    this.orderInfo.name = this.hospitalizationObjectStore.real_name;
    this.orderInfo.merchant_user_id=this.hospitalizationObjectStore.card_no,
    this.orderInfo.merchant_ord_no=this.hospitalizationObjectStore.hospitalization_no,
    this.orderInfo.hospital_id= this.hosObjectStore.id
  
     
    // this.pay_qr_no = "SY9010443520200226172559875320200226172805";
    // this.show  = false;
    // this.orderInfo.name = localStorage.getItem("name");
    // this.orderInfo.money = localStorage.getItem("money");
    // this.orderInfo.hisPatId = localStorage.getItem("hisPatId");
  }
};
</script>