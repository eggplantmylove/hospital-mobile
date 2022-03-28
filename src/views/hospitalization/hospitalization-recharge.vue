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
    <van-overlay :show="overlay_show"></van-overlay>
  
    <div>
      <van-field
        v-model="ic_no"
        name="住院号"
        label="住院/身份证："
        placeholder="住院号或者身份证号" 
        required
        :rules="[{ required: true, message: '请输入住院号或者身份证号' }]"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" @click="queryHospitalization">提交</van-button>
      </div>
         <van-dialog v-model="showinfo" title="请确认患者姓名"  show-cancel-button :before-close="dialogClose">
         <van-field label-class="red_title" placeholder="请输入患者姓名"   label="姓名:"  v-model="confirm_name"></van-field>
       
    </van-dialog>
    </div>
  </div>
</template>
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
</style>
<script>
import {mobileHospitalizaitonList}  from "../../api/api";
import { Dialog } from "vant";
export default {
  data() {
    return {
        overlay_show:false, 
        ic_no:'',
        showinfo:false,
        confirm_name:'',
        hospitalization:{},
        topList: [
        { title: "预约记录", icon: "icon-yuyuejilu", path: "appointment-list" },
        { title: "挂号记录", icon: "icon-guahaojilu", path: "register-list" },
        { title: "缴费明细", icon: "icon-mingxi2" },
        { title: "报告单", icon: "icon-report-fill" },
      ],

    };
  },
  methods: {
      queryHospitalization(){
            mobileHospitalizaitonList({card_no:this.ic_no}).then(res=>{ 
                  console.log(res.data.data)
                    if(res.data.data!=undefined){
                      this.showinfo = true;
                      this.hospitalization = res.data.data
                     
                    }

            })
      },
      dialogClose(action, done) {
      if ("confirm" == action) {
        if (this.confirm_name == this.hospitalization.real_name) {
         this.$store.dispatch("setHospitalization", Object.assign({card_no:this.ic_no},this.hospitalization));
          this.$router.push("/hospitalization-recharge-pay");
        } else {
          Dialog({ message: "姓名校验不通过！" });
        }
        done();
      } else {
        done();
      }
    },
  },
  mounted() {

  },
};
</script>