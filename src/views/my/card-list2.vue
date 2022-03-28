<template>
    <div>
        <van-sticky>
            <van-nav-bar style="background:#316DE0;" :border="false" left-arrow @click-left="$router.go(-1)"> 
                <h4 slot="title" style="color: #fff">个人中心</h4>
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
                </div> -->
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
        <ul class="list">
            <li v-for="item in patList" :key="item.id">
                <div>
                    <p>
                        <span style="margin-right: 10px">姓名:</span>
                        <span>{{item.real_name}}</span>
                    </p>
                    <p>
                        <span style="margin-right: 10px">身份证:</span>
                        <span>{{item.id_no}}</span></p>
                </div>
                <!-- <i>图标</i> -->
            </li>
        </ul>
        <van-button type="info" size="large" @click="showPopup">新增就诊卡</van-button>
        <van-popup v-model="show" position="bottom">
            <van-panel type="flex">
                <van-field v-model="patInfo.real_name" label="姓名" placeholder=请输入姓名 />
                <van-field v-model="patInfo.id_no" label="身份证" placeholder=请输入身份证 />    
               
                 
                <van-button type="info" @click="patAdd" size="large">保存</van-button>
                 
            </van-panel>
          
        </van-popup>
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
import {patAdd,patList} from '../../api/api'
    export default {
        name: 'index',
        data() {
            return {
                topList: [
                    {title: '预约记录', icon: 'icon-jilu'},
                    {title: '挂号记录', icon: 'icon-jilu1'},
                    {title: '缴费明细', icon: 'icon-zizhujiaofei'},
                    {title: '报告单', icon: 'icon-zhuyuanbaogao'},
                ],
                middleList: [
                    {title: '订单中心', icon: 'icon-jilu', color: '#3694D8'},
                    // {title: '个人信息', icon: 'icon-aixin', color: '#FA3232'},
                    {title: '我的就诊卡', icon: 'icon-order-manager', color: '#1BCC3B'},
                     {title: '住院缴费', icon: 'icon-order-manager', color: '#1BCC3B'},
                    {title: '我的医生', icon: 'icon-menzhenfuwukaobei', color: '#F62774'},
                ],
                 show: false, 
                 patList:[],
                 openid:'',
                 patInfo:{real_name:'',id_no:'',openid:this.openid}
              
            }
        },
        mounted:function(){
            this.openid = window.localStorage.getItem("openid")
            console.log(this.openid)
            this.getPatList();
        },
        methods: {
         showPopup:function(){
             this.show = true;
             this.patInfo.real_name='';
             this.patInfo.id_no = '';
         },
         getPatList:function(){
               let params ={"openid":this.openid}
               patList(params).then(res=>{
                   this.patList = res.data.data;
               })
        },
        onClickLeft:function(){

        },
        patAdd:function(){ 
            this.patInfo.openid = this.openid;
            patAdd(this.patInfo).then(res=>{
                if(res.data.reccnt=='success'){
                     this.show = false;
                     this.getPatList();
                }
            })
        }  
       } 
    }
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
                        background: linear-gradient(#38BFF4, #3765FC);
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
                background: #F2F2F2;
                .iconfont {
                    color: #3789F9;
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
        align-items: center
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
