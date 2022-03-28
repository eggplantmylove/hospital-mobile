<template>
    <div>
        <van-sticky>
            <van-nav-bar style="background:#316DE0;" :border="false">
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
                        <li :key="index" @click="routerPath(item.path)">
                            <div class="flex-center">
                                <i class="iconfont" :class="item.icon"></i>
                            </div>
                            <p>{{item.title}}</p>
                        </li>
                    </template>
                </ul>
            </div>
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
        <ul class="list">
            <template v-for="(item, index) in middleList"> 
                <li :key="index" @click="routerPath(item.path)"  > 
                    <div style="display: flex;align-items: center">
                        <i class="iconfont"
                           :class="item.icon"
                           :style="{color: item.color}"
                           style="font-size: 24px;margin-right: 5px"></i>
                        <span>{{item.title}}</span>
                    </div>
                    <van-icon name="arrow"/> 
                </li>
                <van-divider :key="index" v-if="index + 1 !== middleList.length">

                </van-divider>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                topList: [
                    {title: '预约记录', icon: 'icon-yuyuejilu',path:'appointment-list'},
                    {title: '挂号记录', icon: 'icon-guahaojilu',path:'register-list'},
                    {title: '缴费明细', icon: 'icon-mingxi2'},
                    {title: '报告单', icon: 'icon-report-fill'},
                ],
                middleList: [
                    {title: '订单中心', icon: 'icon-order1', color: '#3694D8',path:"/order-list"},
                    // {title: '个人信息', icon: 'icon-aixin', color: '#FA3232'},
                    {title: '我的就诊卡', icon: 'icon-jiuzhenqia', color: '#1BCC3B',path:"/card-list"},
                     {title: '住院缴费', icon: 'icon-zhuyuan', color: '#1BCC3B'},
                    // {title: '我的医生', icon: 'icon-menzhenfuwukaobei', color: '#F62774'},
                ]
            }
        },
        methods:{
           routerPath:function(path){
              this.$router.push({path:path})
           }, 
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
    .list {
        margin-top: 10px;
        background: #fff;
        li {
            display: flex;
            justify-content: space-between;
            padding: 15px 10px;
        }
    }
</style>
