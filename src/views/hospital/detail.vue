<template>
    <div>
        <van-nav-bar title="医院介绍" left-arrow  @click-left="$router.go(-1)">
            <van-button icon="plus" type="info" round slot="right" color="#316DE0" size="small">按钮
            </van-button>
        </van-nav-bar>
        <div class="info">
            <img :src="hospitalImgUrl">
            <div>
                <h4>{{hospital_info.name}}</h4>
                <div class="tag">
                    <van-tag type="danger">三级甲等</van-tag>
                    <van-tag type="primary">公立/专科医院</van-tag>
                </div>
                <p>门诊：09:00-12:00 14:00-17:00</p>
                <p>电话：{{hospital_info.hospital_phone}}</p>
                <p>地址：{{hospital_info.hospital_address}}</p>
            </div>
        </div>
        <van-divider/>
        <ul>
            <li>

            </li>
        </ul>
        <van-grid :column-num="3" class="grid">
            <van-grid-item @click="$router.push('/home')">
                <div class="box flex-center" style="background: #517AF2">
                    <i class="iconfont icon-yuyuexinxi"></i>
                </div>
                <p>预约挂号</p>
            </van-grid-item>
            <van-grid-item>
                <div class="box flex-center" style="background: #18D54C">
                    <i class="iconfont icon-dianhua"></i>
                </div>
                <p>电话预约</p>
            </van-grid-item>
            <van-grid-item>
                <div class="box flex-center" style="background: #F94270">
                    <i class="iconfont icon-xianlu"></i>
                </div>
                <p>查看线路</p>
            </van-grid-item>
        </van-grid>
        <van-tabs v-model="active">
            
            <van-tab v-for="(item,index) in deptList" :key="index" :title="item.text">
                <van-grid :column-num="2" class="doctor">
                    <van-grid-item v-for="(itemDoc,docIndex) in item.doctorList" :key="docIndex">
                        <div class="box">
                            <img :src="doctorImgUrl">
                            <div style="display: flex;flex-direction: column;justify-content: space-around">
                                <div style="display: flex;align-items: center">
                                    <h4>{{itemDoc.doctor_name}}</h4>
                                    <span style="font-size: 12px;color: #999">({{itemDoc.doctor_title}})</span>
                                </div>
                                <P style="font-size: 14px"> 科室：({{itemDoc.dept_name}})</P>
                            </div>
                        </div>
                        <p style="font-size: 12px;margin-top: 5px">【擅长】小儿湿疹、血管炎、过敏性紫癜。</p>
                    </van-grid-item>
                </van-grid>
            </van-tab> 
        </van-tabs>
        <!-- <div class="content-title">
            <h4>就诊需知</h4>
        </div>
        <ul class="know">
            <li style="background: #FFFAFA;border-color: #FEECF0">
                <div class="box flex-center" style="background: #FF2654">
                    <i class="iconfont icon-qupiao"></i>
                </div>
                <p>自助取票</p>
            </li>
            <li style="background: #FFFBF5;border-color: #FEF5D4">
                <div class="box flex-center" style="background: #FFC600">
                    <i class="iconfont icon-jilu"></i>
                </div>
                <p>挂号须知</p>
            </li>
            <li style="background: #F7F9FC;border-color: #E9F1FE">
                <div class="box flex-center" style="background: #5C93E5">
                    <i class="iconfont icon-jilu1"></i>
                </div>
                <p>就诊时间</p>
            </li>
            <li style="background: #FFFAFA;border-color: #E1FDEB">
                <div class="box flex-center" style="background: #1BBD55">
                    <i class="iconfont icon-quxiao"></i>
                </div>
                <p>取消预约</p>
            </li>
        </ul> -->
    </div>
</template>

<script>
    import {hospitalOne,mobileDept,docList,getOpenid} from '../../api/api'  
    export default {
        name: 'detail',

        data() {
            return {
                active: 0,
                hospitalImgUrl:require("../../assets/timg.jpeg"),
                doctorImgUrl:require("../../assets/doctor.jpg"),
                hospital_id:'',
                code:'',
                deptList:[],
                hospital_info:{}
            }
        },
        methods:{
            getHospitalInfo:function(){
                let data = {"id":this.hospital_id}
                hospitalOne(data).then(res=>{
                    this.hospital_info = res.data.data;
                })
            },
            getDeptList: async function(){ 
                let params = {"hospital_id":this.hospital_id}
                await mobileDept(params).then(res=>{
                    this.deptList = res.data.data[0].children;   
                })
                
            },
            getDoctorList:async function(){
                  var that = this;
                  await that.getDeptList();  
                  that.deptList.forEach(item=>{ 
                    let params = {"dept_id":item.id} 
                    docList(params).then(res=>{
                        Object.assign(item,{"doctorList":res.data.data}) 
                    })    
                   
                  })
                 console.log(that.deptList)
            }
            
        },
        mounted(){
            this.hospital_id = window.localStorage.getItem("hospital_id");
            this.code = window.localStorage.getItem("code");
            this.getHospitalInfo();
            // this.getDeptList();
            this.getDoctorList(); 
            
        }
    }
</script>

<style scoped lang="less">
    .van-nav-bar__right {
        .van-button {
            i {
                color: #fff;
                vertical-align: initial;
            }
        }
    }

    .info {
        display: flex;
        background: #fff;
        padding: 10px;
        img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
        }
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .tag {
                padding: 5px 0;
                > span {
                    margin-right: 3px;
                }
            }
            p {
                font-size: 14px;
                color: #333333;
            }
        }
    }

    .grid {
        .box {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            i {
                color: #fff;
                font-size: 30px;
            }
        }
        p {
            margin-top: 3px;
            font-size: 14px;
        }
    }

    .doctor {
        .box {
            display: flex;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }
    }

    .content-title {
        margin-top: 10px;
        padding: 10px;
        background: #fff;
        p {
            font-size: 14px;
        }
    }

    .know {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: #fff;
        li {
            border: 1px solid;
            padding: 8px 15px;
            .box {
                margin: 5px auto;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                i {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }
    }
</style>
