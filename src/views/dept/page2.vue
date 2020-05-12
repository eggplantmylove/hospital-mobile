<template>
  <div>
    <van-nav-bar  left-arrow @click-left="onClickLeft">
      <template #title>
        <div class="btns">
          <span class="active">按日期</span>
          <span style="margin-left: -1px">按医生</span>
        </div>
      </template>
      <template #right>
        <van-icon name="chat-o" size="18" />
      </template>
    </van-nav-bar>

    <div class="dates">
      <div class="txt1">
        <p style="font-weight: bold">门诊预约</p>
        <p style="float: right">{{today}}</p>
      </div>
      <div class="list">
       
        <div class="item" v-for="(item,index)  in dateList" :key="index" :class="{'active':currentSort==index}" @click="active(index,item.date_str)">
          <div style="padding: 5px 0">{{item.week}}</div>
          <div class="num">{{item.day}}</div>
          <div class="tag">
            <van-tag round type="primary">有号</van-tag>
          </div>
        </div>
       
      </div>
    </div>

    <div class="rregister_list" style="height: calc(100vh - 137px - 46px);overflow: auto">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <div class="doctorInfo">
          <div class="item" v-for="(item,index) in doctorList" :key="index" @click="listClick(item.id)">
            <div style="display: flex">
              <div style="width: 50px;text-align: center">
                <van-image round width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg" ></van-image>
                <van-tag round type="warning" style="padding: 0 8px;background: #E8AB3F;margin-top: 7px">名医</van-tag>
              </div>
              <div class="msg">
                <div class="name">
                  <span style="font-weight: bold;margin-right: 5px">{{item.doctor_name}}</span>
                  <span class="position">({{item.doctor_title}})</span>
                  <div class="num">
                    <van-tag round type="primary" plain >余号:{{item.num}}</van-tag>
                    <van-tag round type="primary">￥{{item.cost}}</van-tag>
                  </div>
                </div>
                <div class="expand">
                  <div class="txt1">
                    <span> {{item.hospital_name}}</span>
                    <!-- <span>三级甲等</span>-->
                    <span>{{item.dept_name}}</span> 
                  </div>
                  <div class="stars">
                    <van-icon name="star" />
                    <van-icon name="star" />
                    <van-icon name="star" />
                  </div>
                  <div class="txt2">
                    <!-- <span>好评率 <span class="default">99.6%</span></span>
                    <span>服务患者 <span class="default">213213</span></span> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="introduce">
              <div style="width: 70px;text-align: right">【介绍】</div>
              <div class="txt">
                {{item.doctor_introduction}}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
    import {mobileOutpatientDoctor} from '../../api/api';
  export default {
    data() {
      return {
        list: [],
        doctorList:[],
        currentSort:0,
        dateList:[],
        dept_id:'',
        today:'',
        param:{},
        loading: false,
        finished: false,
      };
    },
    methods: {
      active(index,date_str) {
       this.currentSort  =  index;
       this.today = date_str;
       let param = {"date_str":date_str,"dept_id":this.dept_id}
        mobileOutpatientDoctor(param).then(res=>{ 
         this.doctorList = res.data.data.doc_res_vo;
         this.dateList = res.data.data.date_list;
         this.loading = true;
         this.finished = true;
        })
      },
      onClickLeft() {
        Toast('返回');
      },
      listClick(doctor_id){
       this.$router.push({path:`/detail-resource/${doctor_id}`})
      },

      getDoctorList(){
        let param={"dept_id":this.dept_id}
        mobileOutpatientDoctor(param).then(res=>{ 
         this.doctorList = res.data.data.doc_res_vo;
         this.dateList = res.data.data.date_list;
         this.today = this.dateList[0].date_str;
         this.loading = true;
         this.finished = true;
        })
      },

    },
    mounted(){
      this.dept_id =  this.$route.params.id;
      this.getDoctorList();
    }
  }
</script>

<style lang="scss" scoped>
  //头部样式
  /deep/ .van-nav-bar{
    background: #3372D0;
    .van-icon{
      color: #fff;
    }
    .van-nav-bar__text{
      color: #fff;
    }
    .van-nav-bar__title{
      color: #fff;
    }
    .btns{
      span{
        font-size: 16px;
        border: 1px solid #fff;
        padding: 2px 15px;
      }
      .active{
        background: #fff;
        color: #3372D0;
      }
    }
  }
  //日期选择
  .dates{
    padding-top: 12px;
    padding-bottom: 5px;
    border-bottom: 4px solid gainsboro;
    .txt1 p{
      padding: 0 12px;
      margin: 0;
      display: inline-block;
    }
    .list{
      display: flex;
      .item{
        text-align: center;
        flex: 1;
        font-size: 14px;
        .num{
          margin-bottom: 5px;
          padding: 5px;
          width: 26px;
          line-height: 26px;
          height: 26px;
          font-size: 20px;
          display: inline-block;
          border-radius:50% ;
          text-align: center;
          background: #e0e0e0;
          color: #000;
        }
        .tag{
          position: relative;
          top: -5px;
          .van-tag--primary{
            background: #e0e0e0;
            color: #000;
          }
        }
      }
      .item.active{
        .num{
          background: #1989FA;
          color: #fff;
        }
        .tag{
          .van-tag--primary{
            background: #1989FA;
            color: #fff;
          }
        }
      }
    }
  }
  //医生信息
  .doctorInfo{
    .item{
      padding: 10px 15px;
      border-bottom: 1px solid gainsboro;
      .msg{
        flex: 1;
        /*background: red;*/
        margin-left: 10px;
        //名字这一排的样式
        .name{
          font-size: 16px;
          .position{
            font-size: 14px;
            color:#B1B1B1;
          }
          .num{
            float: right;
            .van-tag{
              margin-left: 5px;
              padding: 2px 8px;
            
            }
          }
        }
        //名字下面的文字
        .expand{
          margin-top: 5px;
          .txt1 span{
            font-size: 12px;
            color: #9c9898;
            &:not(:first-child):before{
              content:" | ";
            }
          }
          .stars{
            .van-icon{
              font-size: 12px;
              color: #ECA940;
            }
          }
          .txt2 span{
            font-size: 12px;
            color: #9c9898;
            margin-right: 20px;
            .default{
              color: #469FF4;
            }
          }
        }
      }

      .introduce{

        line-height: 16px;
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        .txt{
          flex: 1;
          white-space:normal;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

</style>
