<template>
  <div>
    <van-sticky>
      <van-nav-bar
        style="background: #316de0"
        :border="false"
        left-arrow
        @click-left="$router.go(-1)"
      >
        <h4 slot="title" style="color: #fff">添加就诊卡</h4>
      </van-nav-bar>
    </van-sticky>
    <div class="top">
      <div style="background: #316de0; height: 130px"></div>
      <div style="background: #fff; height: 70px"></div>
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
                </div> -->
        <ul class="top-list">
          <template v-for="(item, index) in topList">
            <li :key="index">
              <div class="flex-center">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              <p>{{ item.title }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div>
      <van-tabs v-model="active" color="#1989fa">
        <van-tab title="有就诊卡">
          <van-field
            v-model="patInfo.card_no"
            label="就诊卡号"
            placeholder="请输入就诊卡号"
          >
            <!-- <template #button>
              <van-button size="small" type="info">扫一扫</van-button>
            </template> -->
          </van-field>
          <van-field
            v-model="patInfo.real_name"
            label="姓名"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            v-model="patInfo.address"
            label="地址"
            placeholder=""
            :rules="[{ required: true, message: '请输入地址' }]"
            readonly
          />
          <van-field
            v-model="show_phone"
            label="手机号"
            placeholder=""
            :rules="[{ required: true, message: '请输入手机号' }]"
            readonly
          />
          <van-field
            v-model="patInfo.sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button
                size="small"
                type="info"
                @click="getCode"
                :disabled="!sms_disbale"
              >
                <span v-show="sms_disbale">获取验证码</span>
                <span v-show="!sms_disbale" class="count">{{ count }} s</span>
              </van-button>
            </template>
          </van-field>
          <van-button
            type="info"
            style="margin: 5px"
            size="large"
            @click="queryPatInfo"
            >查询</van-button
          >
          <van-button
            type="info"
            style="margin: 5px"
            size="large"
            @click="patAdd"
            >保存</van-button
          >
        </van-tab>
        <van-tab title="无就诊卡">
          <van-field
            v-model="save_pat_info.real_name"
            label="姓名"
            placeholder="请输入姓名"
             :rules="[{ required: true, message: '请输入姓名' }]"
          />
          <van-field
            v-model="save_pat_info.id_no"
            label="身份证号"
            placeholder="请输入身份证号"
             :rules="[{ required: true, message: '请输入身份证号' }]"
          />
          <van-field
            v-model="save_pat_info.phone"
            label="手机号"
            placeholder="请输入手机号"
             :rules="[{ required: true, message: '请输入手机号' }]"
          />
          <van-field
            v-model="save_pat_info.sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button
                size="small"
                type="info"
                @click="getCode"
                :disabled="!sms_disbale"
              >
                <span v-show="sms_disbale">获取验证码</span>
                <span v-show="!sms_disbale" class="count">{{ count }} s</span>
              </van-button>
            </template>
          </van-field>
          <van-field
            v-model="save_pat_info.address"
            label="地址"
            placeholder="请输入地址"
             :rules="[{ required: true, message: '请输入地址' }]"
          />
          <van-button
            type="info"
            style="margin: 5px"
            size="large"
            @click="patAdd"
            >保存</van-button
          >
        </van-tab>
      </van-tabs>

      <!-- <ul class="card-list">
            <li v-for="item in 3" :key="item">
                <div>我是药品标题哦</div>
                <div class="content">
                    <div style="color: #999;font-size: 14px">
                        <div>补充多种东西</div>
                        <div>73.6g (0.92g*80片)</div>
                    </div>
                    <p style="color: red">&yen;99</p>
                </div>
                <div style="margin-top: 5px">
                    <div class="tag">
                        <span>直购</span>
                        <span>满减</span>
                    </div>
                </div>
            </li>
        </ul> -->
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
        </div> -->
  </div>
</template>

<script>
import { mobileSavePatInfo, queryPatInfo, smsSend } from "../../api/api";
import { Dialog } from "vant";
export default {
  name: "index",
  data() {
    return {
      topList: [
        { title: "预约记录", icon: "icon-jilu", path: "appointment-list" },
        { title: "挂号记录", icon: "icon-jilu1" },
        { title: "缴费明细", icon: "icon-zizhujiaofei" },
        { title: "报告单", icon: "icon-zhuyuanbaogao" },
      ],
      middleList: [
        { title: "订单中心", icon: "icon-jilu", color: "#3694D8" },
        // {title: '个人信息', icon: 'icon-aixin', color: '#FA3232'},
        { title: "我的就诊卡", icon: "icon-order-manager", color: "#1BCC3B" },
        { title: "住院缴费", icon: "icon-order-manager", color: "#1BCC3B" },
        { title: "我的医生", icon: "icon-menzhenfuwukaobei", color: "#F62774" },
      ],
      show: false,
      sms_disbale: true,
      patList: [],
      openid: "",
      count: 0,
      active: 0,
      show_phone:'',
      save_pat_info:{},
      patInfo: {
        real_name: "",
        id_no: "",
        openid: this.openid,
        card_no: "",
        phone: "",
        address: "",
        sms: "",
      },
    };
  },
  mounted: function () {
    this.openid = window.localStorage.getItem("openid");
  },
  methods: {
    queryPatInfo: function () {
      this.show = true;
      queryPatInfo({
        card_no: this.patInfo.card_no,
        real_name: this.patInfo.real_name,
      }).then((res) => {
        if (res.data.reccnt == "success") {
          this.patInfo = res.data.data;
          let temp = this.patInfo.phone;
          if(temp!=null){                   
            this.show_phone = temp.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
          } 
          console.log(this.show_phone)
          this.show = false;
        }
      });
    },
    getCode() {
      let param = { phone: this.patInfo.phone, openid: this.openid }; 
      if (this.openid != null && this.openid != undefined) {
        smsSend(param).then((res) => {
          console.log(res);
        });
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      } else {
        Dialog({
          message:
            "无法获得身份信息，请关闭应用重新进入，如果多次出现请联系管理员",
        });
      }
    }, 
    onClickLeft: function () {},
    patAdd: function () {
      let params =null;
      if(this.active==1){
        params = this.save_pat_info;
      }else{
          params = this.patInfo;
      }
      params.openid = this.openid;
      mobileSavePatInfo(params).then((res) => {
        if (res.data.reccnt == "success") {
          this.show = false;
          Dialog.alert({
            message: "绑定成功",
          }).then(() => {
            this.$router.push("/card-list");
          });
        } else {
          Dialog({ message: res.data.message });
        }
      });
    },
  },
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
  padding: 20px;
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
  padding: 3px;
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
</style>
