<template>
  <div class="container">
    <div class="box">
      <div class="top">
        <!-- <img src="../assets/logo.png"/> -->
        <p>河池市第一人民医院在线缴费</p>
      </div>
      <div class="content">
        <div>
          <p>缴费金额</p>
          <div class="input">
            <span>&yen;</span>
            <input v-model="order_money" readonly />
          </div>
          <p style="color: #0848b2">核酸检测费用缴费</p>
        </div>
        <div style="text-align: center">
          <van-button type="primary" @click="pay">确认缴费</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.inc.min.js"></script>
<script>
import { payScanQrcode } from "../api/api";
export default {
  data() {
    return { 
      openid:'',
      order_money:10,
    };
  },
  methods: {
   pay: function() {
      let now = new Date().getTime();
      let data = {
        openid: this.openid,
        // hospital_id: this.hosObjectStore.id,
        order_money: this.order_money,
        // merchant_user_id: this.patObjectStore.his_pat_id,   新系统用id 旧系统用card_no
        // merchant_user_id: 'HSJC_HJ',
        merchant_ord_no:'HSJC_HJ_'+now+this.openid,
        title:'核酸检测混检（扫码）',
        name:'核酸检测（混检）'
      };
      payScanQrcode(data).then(res => { 
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
                  appId: res.data.data.appId, //公众号ID，由商户传入
                  timeStamp: res.data.data.timeStamp, //时间戳，自1970年以来的秒数
                  nonceStr: res.data.data.nonceStr, //随机串
                  package: res.data.data.prepay_id,
                  signType: res.data.data.signType, //微信签名方式：
                  paySign: res.data.data.paySign, //微信签名
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
  },
  mounted() {
      this.openid = window.localStorage.getItem("openid");
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  background-color: #f7f7f7;
  height: 100%;
}

.box {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
  }
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 30px 10vh;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .input {
    display: flex;
    padding: 10px 0 15px;
    border-bottom: 1px solid #e8e8e8;

    span {
      font-size: 40px;
      font-weight: bold;
    }

    input {
      width: 100%;
      font-size: 32px;
      margin-left: 20px;
      border: none;
    }
  }
  .van-button { 
    font-size: 20px;
  }
}
</style>