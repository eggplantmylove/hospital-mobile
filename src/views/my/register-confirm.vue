<template>
    <div>
        <van-nav-bar
                right-text="消息"
                left-arrow
                @click-left="$router.go(-1)">
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
                </div> -->
                <div class="mobile">
                    <p>手机号</p>
                    <p>{{patObjectStore.phone}}</p>
                </div>
            </div>
        </div>
        <h4 style="margin: 20px 10px 10px">就诊信息</h4>
        <van-list class="doctor">
            <van-cell>
                <div class="flex">
                    <p>门诊医院</p>
                    <p>{{resObjectStore.hospital_name}}</p>
                </div>
            </van-cell>
            <van-cell>
                <div class="doctor-info">
                    <div>
                        <h4 style="display: inline-block;font-size: 16px">{{resObjectStore.doctor_name}}</h4>
                        <span style="font-size: 14px;color: #999">({{resObjectStore.doctor_title}})</span>
                    </div>
                    <div>
                        科室：{{resObjectStore.dept_name}}
                    </div>
                </div>
            </van-cell>
            <van-cell>
                <div class="flex">
                    <p>门诊科室</p>
                    <div>
                        <p>{{resObjectStore.dept_name}}</p>
                        <p style="font-size: 10px; text-align: right">{{resObjectStore.loaction}}</p>
                    </div>
                </div>
            </van-cell>
            <!-- <van-cell>
                <div class="flex">
                    <p>就诊时间</p>
                    <p>我是时间时间时间</p>
                </div>
            </van-cell> -->
            <!-- <van-cell>
                <div class="flex">
                    <p>挂号费</p>
                    <p>&yen;99</p>
                </div>
            </van-cell> -->
        </van-list>
        <div class="tips">
            <h4>温馨提示</h4>
            <p>就诊前请带好您的身份证、社保卡，请保留好您在线预约取票号码</p>
        </div>
        <van-button round type="info" style="display: block;width: 70%;margin: 0 auto" @click="registerConfirm">确认</van-button>
    </div>
<!-- <?xml version="1.0" encoding="UTF-8" standalone="yes"?><OutXml><ZBLB>2</ZBLB><BLJE>0</BLJE><JZHM>17051540092</JZHM><GHSJ>2020-05-13</GHSJ><ResultCode>0</ResultCode><SBXH>1393638</SBXH><ErrorMsg>成功</ErrorMsg><PatientId>283170</PatientId><CardNo>45223119881130601X</CardNo></OutXml> -->
</template>
<script>
    import {registerConfirm} from '../../api/api'
    import {mapGetters} from 'vuex';
    export default {
        name: 'demo',
         data(){
            return {
                openid:'',
                patList:[]
            }
        },
        methods:{
            registerConfirm:function(){
                let params=Object.assign(this.patObjectStore,this.resObjectStore,{"hospital_code":"441283103"})
                registerConfirm(params).then(res=>{
                    console.log(res)
                })
            },
            getPatList(){
               let params ={"openid":this.openid}
               patList(params).then(res=>{
                   this.patList = res.data.data;
               })
            }
        },
        mounted(){
           this.openid = window.localStorage.getItem("openid") 
           this.getPatList();

        },
        computed:{
              ...mapGetters(['resObjectStore','patObjectStore'])
        }
    }
   
</script>

<style scoped lang="less">
    .van-nav-bar {
        background: #316DE0;
    }

    .van-hairline--bottom::after {
        border: none;
    }

    .box {
        background: linear-gradient(to top, #F2F2F2 50%, #316DE0 50%);
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
</style>
