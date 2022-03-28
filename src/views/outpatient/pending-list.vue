<template>
  <div>
    <van-overlay :show="show" @click="show = false" />
    <van-nav-bar right-text="消息" left-arrow @click-left="$router.go(-1)">
      <h4 slot="title" style="color: #fff">待缴费信息</h4>
    </van-nav-bar>
    <div class="box">
      <div class="card">
        <h4>就诊卡信息</h4>
          <van-icon name="exchange" style="float:right;margin-top: -22px;"  @click="changeUser" />
        <div class="user-info">
          <span>就诊人：{{patObjectStore.real_name}}</span>

          <span>就诊卡号：{{patObjectStore.card_no}}</span>
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
        </div>-->
        <div class="mobile">
          <p>手机号</p>
          <p>{{patObjectStore.phone}}</p>
        </div>
      </div>
    </div>
    <h4 style="margin: 20px 10px 10px">待缴费信息</h4>
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in pendingPay.pay_list" :key="index">
        <template #title>
          <div style="display: flex">
            <van-cell :title="item.title">{{item.item_money}}元</van-cell>
          </div>
        </template>
        <ul class="card-list">
          <li v-for="(itemDetail,i) in item.list_detail" :key="i">
            <div>名称：{{itemDetail.title}}</div>
            <div class="content">
              <div style="color: #999;font-size: 14px">
                <div>单价：{{itemDetail.price}}</div>
                <div>金额：{{itemDetail.money}}</div>
                <div>数量：{{itemDetail.amount}}</div>
                <div>单位：{{itemDetail.unit}}</div>
                <div>规格：{{itemDetail.specs}}</div>
              </div>
              <!-- <p style="color: red">&yen;99</p> -->
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
    <van-cell title="合计金额：">
      <p style="color: red">&yen;{{total_fee}}</p>
    </van-cell>
    <!-- <h4 style="margin: 20px 10px 10px">缴费方式</h4>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="微信缴费" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="银行卡" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group> -->

    <div class="tips">
      <h4>温馨提示</h4>
      <p>就诊前请带好您的身份证、社保卡，请保留好您在线预约取票号码</p>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="patList"
        value-key="real_name"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-button round type="info" style="display: block;width: 70%;margin: 0 auto" @click="pay(pendingPay.pay_list[0].item_id)">立即缴费</van-button>
  </div>
  <!-- <?xml version="1.0" encoding="UTF-8" standalone="yes"?><OutXml><ZBLB>2</ZBLB><BLJE>0</BLJE><JZHM>17051540092</JZHM><GHSJ>2020-05-13</GHSJ><ResultCode>0</ResultCode><SBXH>1393638</SBXH><ErrorMsg>成功</ErrorMsg><PatientId>283170</PatientId><CardNo>45223119881130601X</CardNo></OutXml> -->
</template>
<script>
import { pendingPay, outpatientPay,patList } from "../../api/api";
import { mapGetters } from "vuex";
import { RadioGroup, Radio } from "vant";
export default {
  name: "demo",
  data() {
    return {
      activeNames: [],
      pendingPay: {},
      prescription:[],
      patList: [],
      item_list:[],
      show: false,
      showPicker: false, 
      openid:'',
      radio: "1"
    };
  },
  methods: {
     async getPendingPay() { 
      this.show = true;
     
      // let params = Object.assign(this.patObjectStore, {
      //   hospital_code: this.hosObjectStore.hospital_code
      // });
     await pendingPay(this.patObjectStore).then(res => {
        this.pendingPay = res.data.data;
        this.show = false;
      }); 
      this.item_list = this.pendingPay.pay_list;
      this.pendingPay.pay_list.forEach(element => {
           let pre = Object.assign({prescription_no:element.item_id},element)
           this.prescription.push(pre)
      }); 
      this.show = false;
    },
    getPatList() {
      this.openid = window.localStorage.getItem("openid");
      let params = { openid: this.openid };
      patList(params).then((res) => {
        this.patList = res.data.data;
      });
    },
    onConfirm(value) {
      this.$store.dispatch("setPatObject", value);
      this.getPendingPay();
      this.showPicker = false;
    },
    changeUser() {
      this.showPicker = true;
    },
    pay: function(item_id) {
      let data = {
        openid: this.openid,
        // hospital_id: this.hosObjectStore.id,
        order_money: this.pendingPay.total,
        // merchant_user_id: this.patObjectStore.his_pat_id,   新系统用id 旧系统用card_no
        merchant_user_id: this.patObjectStore.card_no,
        merchant_ord_no:item_id,
        name:this.patObjectStore.real_name,
        prescription_vo:this.prescription
      };
      outpatientPay(data).then(res => { 
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
    this.getPatList();
    this.getPendingPay();
  },
  computed: { 
      total_fee() {
      return this.item_list.reduce((acc, item) => {
        return acc + parseFloat(item.item_money);
      }, 0);
    },
    ...mapGetters(["resObjectStore", "patObjectStore", "hosObjectStore"])
  }
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #316de0;
}

.van-hairline--bottom::after {
  border: none;
}

.box {
  background: linear-gradient(to top, #f2f2f2 50%, #316de0 50%);
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
ul {
  margin: 0 !important;
}

li {
  background: #f2f2f2;
}
.card-list li {
  margin-top: 10px;
  padding: 20px;
  list-style: none;
  background: #f2f2f2;
}

.card-list li .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-list li .tag span {
  border: 1px solid red;
  border-radius: 5px;
  padding: 3px;
  color: red;
  font-size: 15px;
  margin-right: 5px;
}
</style>
