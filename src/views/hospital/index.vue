<template>
  <div>
    <!-- <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
            <van-dropdown-item v-model="value" :options="option" title="排序"/>
    </van-dropdown-menu>-->
    <!-- <div class="tag">
            <van-tag round type="primary">综合型</van-tag>
            <van-tag round type="success">妇产科</van-tag>
            <van-tag round type="danger">内分泌失调</van-tag>
            <van-tag round type="warning">肾结石</van-tag>
            <van-tag round type="warning">肺结核</van-tag>
    </div>-->
    <van-divider />
    <ul class="hospital-list">
      <li v-for="(item,index) in hospitalList" :key="index" @click="hospitalDetail(item.id)">
        <div class="img-distance">
          <img :src="hospitalImgUrl" />
        </div>
        <div>
          <h4>{{item.name}}</h4>
          <div>
            <van-tag type="danger">三级甲等</van-tag>
            <van-tag type="primary">公立/专科医院</van-tag>
          </div>
          <div class="brief">
            <span class="title">【简介】</span>
            <span class="content">{{item.hospital_introduction}}</span>
          </div>
          <div class="brief">
            <span class="title">电话：</span>
            <span class="content">{{item.hospital_phone}}</span>
          </div>

          <!--                       
                       <div class="grade">
                        <div>
                            <p>10<span>分</span></p>
                            <span>医疗水平</span>
                        </div>
                        <div>
                            <p>10<span>分</span></p>
                            <span>医院服务</span>
                        </div>
                        <div>
                            <p>10<span>分</span></p>
                            <span>就诊价格</span>
                        </div>
          </div>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { hospitalList,getOpenid,patLogin} from "../../api/api";
export default {
  name: "index",
  data() {
    return {
      value: "a",
      hospitalImgUrl: require("../../assets/timg.jpeg"),
      option: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      hospitalList: [],
      openid:'oAqKWw8Z0LuFx5iDMMJZMfhfmAjY',
      codewx: ""
    };
  },
  methods: {
    getHospitalList: function() {
      let param = {};
    
      hospitalList(param).then(res => {
        this.hospitalList = res.data.data;
      });
    },
    hospitalDetail: async function(id) {
          window.localStorage.setItem("hospital_id", id); 
          let data = {"code":this.codewx,"hospital_id":id}; 
           await getOpenid(data).then(res=>{    
                this.openid  = res.data.data.openid;
                window.localStorage.setItem("openid",this.openid );
                  
           })
           let params = {"username":this.openid,"password":this.openid}  
           await patLogin(params).then(res=>{  
              window.localStorage.setItem("token",res.headers.authorization)
           })
      
      this.$router.push("/hospital/detail/" + id);
    }
  },
  mounted() { 
    this.codewx = window.localStorage.getItem("code");
    this.getHospitalList();
  }
};
</script>

<style scoped lang="less">
.tag {
  background: #fff;
  padding: 10px 5px;
}

.van-tag {
  margin-right: 3px;
}

.hospital-list {
  background: #fff;
  li {
    display: flex;
    padding: 10px;
    .img-distance {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 15px;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        padding-top: 5px;
        color: #999;
        font-size: 14px;
      }
    }
    .brief {
      display: flex;
      align-items: center;
      height: 30px;
      .title {
        font-size: 14px;
      }
      .content {
        display: inline-block;
        width: 200px;
        font-size: 12px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        // white-space:normal;
        white-space: nowrap;
      }
    }
    .grade {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 18px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
