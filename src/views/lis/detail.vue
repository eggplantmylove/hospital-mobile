<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)">
      <h4 slot="title" style="color: #fff">检验详细信息</h4>
    </van-nav-bar>
    <h4 style="margin: 20px 10px 10px">检验信息</h4>
     
         <div  class="card" >
           <div class="user-info">
                <h5>{{lis.title}}</h5>    
          <h5>{{lis.report_time}}</h5> 
           </div>
       
        <van-grid :column-num="4" :gutter="1">
          <van-grid-item   text="名称" /> 
          <van-grid-item   text="结果" />
          <van-grid-item   text="参考范围" />
           <van-grid-item   text="提示" />
        </van-grid>
         <van-grid v-for="(item,index) in lis.details" :key="index" :gutter="1" :column-num="4" direction="horizontal" >
          <van-grid-item   :text="item.title" /> 
          <van-grid-item   :text="item.result"  />
          <van-grid-item   :text="item.ref_range" />
          <van-grid-item>
              <van-icon :name="item.abnormal|filterIcon" :color="item.abnormal|filterIconColor" />
          </van-grid-item>
        </van-grid>
         </div> 
    <div class="tips">
      <h4>温馨提示</h4>
      <p>就诊前请带好您的身份证、社保卡，请保留好您在线预约取票号码</p>
    </div>
    <!-- <van-button
      round
      type="info"
      style="display: block; width: 70%; margin: 0 auto"
      @click="appointment_register()"
      >犯忌讳</van-button -->
    >
  </div>
</template>

<script>
import { getLisDetail } from "../../api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      lis: {},
      id: "",
    };
  },
  filters: {
    filterIcon(status) {
      const statusMap = { 
        0: "success",
        1: "arrow-up",
        2: "arrow-down", 
      };
      return statusMap[status];
    },
    filterIconColor(status){
      const statusMap = { 
        0: "green",
        1: "#ee0a24",
        2: "#1989fa", 
      };
      return statusMap[status];
    }
  },
  computed: {
    ...mapGetters(["resObjectStore", "patObjectStore"]),
  },
  methods: {
    queryListDetail() {
      getLisDetail({ card_no: this.patObjectStore.card_no,id:this.id }).then((res) => {
        this.lis = res.data.data;
        console.log(this.lis)
      });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.queryListDetail();
    // this.init();
    // this.queryCostList();
  },
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #316de0;
}

.van-hairline--bottom::after {
  border: none;
}

.card {
  margin: 10px 10px 10px;
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
  .detal-info{
     display: flex;
       justify-content: space-between;
    
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
 /deep/ .van-grid-item__content {
       display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: 8px 4px;
 }
.tips {
  margin: 10px;

  p {
    margin-top: 5px;
    font-size: 14px;
  }
}
</style>
