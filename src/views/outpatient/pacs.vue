<template>
  <div>
    <van-overlay :show="show" @click="show = false" />
    <van-nav-bar right-text="消息" left-arrow @click-left="$router.go(-1)">
      <h4 slot="title" style="color: #fff">就诊信息</h4>
    </van-nav-bar>
    <div class="box">
      <div class="card">
        <h4>就诊卡信息</h4>
        <div class="user-info">
          <span>就诊人：{{patObjectStore.real_name}}</span>

          <span>身份证：{{patObjectStore.id_no}}</span>
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
    <h4 style="margin: 20px 10px 10px">检查报告信息</h4>
    <van-image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=792671745,557154063&fm=26&gp=0.jpg" />
     <van-cell title="影像诊断" value="诊断诊断诊断诊断诊断诊断内容" />
      <van-cell title="影像所见" value="所见所见所见所见所见所见所见所见所见内容" />
       <van-cell title="影像建议" value="建议内容内容建议内容内容建议内容内容建议内容内容建议内容内容建议内容内容建议内容内容" />
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
    </div>
  <!-- <?xml version="1.0" encoding="UTF-8" standalone="yes"?><OutXml><ZBLB>2</ZBLB><BLJE>0</BLJE><JZHM>17051540092</JZHM><GHSJ>2020-05-13</GHSJ><ResultCode>0</ResultCode><SBXH>1393638</SBXH><ErrorMsg>成功</ErrorMsg><PatientId>283170</PatientId><CardNo>45223119881130601X</CardNo></OutXml> -->
</template>
<script>
import { pendingPay, outpatientPay } from "../../api/api";
import { mapGetters } from "vuex";
import { RadioGroup, Radio } from "vant";
export default {
  name: "demo",
  data() {
    return {
      activeNames: [],
      pendingPay: {},
      show: false,
      radio: "1"
    };
  },
  methods: {
    getPendingPay: function() {
      console.log(this.hosObjectStore);
      this.show = true;
      let params = Object.assign(this.patObjectStore, {
        hospital_code: this.hosObjectStore.hospital_code
      });
      pendingPay(params).then(res => {
        this.pendingPay = res.data.data;
        this.show = false;
      });
      this.show = false;
    } 
  },
  mounted() {
    console.log("@@")
    this.getPendingPay();
  },
  computed: {
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
