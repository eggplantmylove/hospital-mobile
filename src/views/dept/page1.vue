<template>
  <div>
    <van-nav-bar
            title="号源信息"
            left-text=""
            :right-text="query_date"
            left-arrow
            @click-left="onClickLeft"
    />

    <div class="doctorInfo">
      <div class="item" style="border-bottom: 4px solid #F1F1F1">
        <div style="display: flex">
          <div style="width: 50px;text-align: center">
            <van-image round width="50px" height="50px" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2461895673,3966340434&fm=26&gp=0.jpg" ></van-image>
            <van-tag round type="warning" style="padding: 0 8px;background: #E8AB3F;margin-top: 7px">名医</van-tag>
          </div>
          <div class="msg">
            <div class="name">
              <span style="font-weight: bold;margin-right: 5px" v-if="doctorObjectStore.doctor_name">{{doctorObjectStore.doctor_name}}</span>
              <span class="position">{{doctorObjectStore.doctor_title}}</span>
              <div class="num">
               <van-tag round type="primary" plain >余号:{{doctorObjectStore.num}}</van-tag>
                    <!-- 
                <van-tag round type="primary">¥{{$floatFormatter.float_format(doctorObjectStore.cost)}}</van-tag> -->
              </div>
            </div>
            <div class="expand">
              <div class="txt1">
                <!-- <span>{{doctor.hospital_name}}</span> -->
                <!-- <span>三级甲等</span> -->
                <span>{{doctorObjectStore.dept_name}}</span>
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
          {{doctorObjectStore.doctor_introduction}}
          </div>
        </div>
      </div>
    </div>

    <div class="rregister_list" style="height: calc(100vh - 146px - 46px);overflow: auto">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <!-- <van-tabs v-model="active">
          <van-tab title="标签 1"></van-tab>
          <van-tab title="标签 2"></van-tab>
        </van-tabs> -->
        <div  v-for="(item,index) in detailList" :key="index" class="item">
          <div class="div1">
            <van-tag round type="primary">{{doctorObjectStore.doctor_title}}</van-tag>
            <div style="margin-top: 3px">{{item.resource_date}}</div>
          </div>
          <div class="div2">
            <div class="txt">{{item.resource_time}}</div>
            <div style="margin-top: 3px">时间</div>
          </div>
          <div class="div2">
            <div class="txt">{{index+1}}号</div>
            <div style="margin-top: 3px">票号</div>
          </div>
          <!-- <div class="div2">
            <div class="txt">￥{{$floatFormatter.float_format(doctorObjectStore.cost)}}</div>
            <div style="margin-top: 3px">费用</div>
          </div> -->
          <div class="div3">
            <van-button round type="info" size="small" v-if="today==query_date" @click="register(item)">挂号</van-button>
              <van-button round type="info" size="small" v-if="today!=query_date" @click="register(item)">预约</van-button>
            <!-- <van-button round size="small" v-else style="background: #B2B2B2;color: #fff" >已预约</van-button> -->
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
   
  import {mobileResDetail} from '../../api/api'
import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        active: 1,
        list: [],
        doctor:{},
        detailList:[],
        query_date:'',
        today:'',
        loading: false,
        finished: false,
        show:false
      };
    },
    computed: {
    ...mapGetters(["doctorObjectStore"]),
    },
    methods: {
      onClickLeft() {
         this.$router.back(-1)
      },
      getResDetailVo(){
        let params = {dept_code:this.doctorObjectStore.dept_code,doctor_code:this.doctorObjectStore.doctor_code,date_str:this.query_date}
         mobileResDetail(params).then(res=>{ 
           this.doctor = res.data.data.doc_res_vo;
           this.detailList  = res.data.data.res_list
           this.loading = true;
           this.finished = true;
         })
      },
      register(item){
       
           let doctor_resource_id = item.id;
           let temp = Object.assign(item,this.doctorObjectStore)
           temp.doctor_resource_id =doctor_resource_id;
           this.$store.dispatch("setDocres", temp);
           this.$router.push({path:'/register-confirm'});
      }
    },
    mounted(){ 
      let id =  this.$route.params.id; 
      this.query_date = this.$route.params.date_str;
      this.today = this.$dateFormatter.format(new Date(),'yyyy-MM-dd')
      this.getResDetailVo(id);
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
  //选项卡那个焦点横条
  /deep/ .van-tabs__line{
    background: #3372D0;
  }

  //挂号列表
  .rregister_list{
    .item{
      display: flex;
      padding: 15px;
      border-bottom: 1px solid #f8f8f8;
      .div1{
      
        font-size: 12px;
      }
      .div2{
        text-align: center;
        flex: 1;
        font-size: 12px;
        .txt{
          font-size: 16px;
        }
      }
      .div3{
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
