<template>
  <div>
   <van-overlay :show="show">
    <div class="wrapper" @click.stop>
       <van-loading type="spinner" color="#1989fa" />
    </div>
  </van-overlay>
    <van-nav-bar   left-arrow @click-left="$router.go(-1)">
      <h4 slot="title" style="color: #fff">订单信息</h4>
    </van-nav-bar>
    <div class="box">
      <div class="card" v-for=" item in list" :key="item.id">
        <h4>{{list.title}}</h4>
        <div class="user-info">
          <span>费用：{{item.title}}</span>
          <span>金额：{{fun(item.order_money)}}</span>
        </div>
        <div class="user-info">
          <span>订单号：{{item.out_trade_no }}</span>
          <span>姓名：{{item.name}}</span>  
         
        </div>

        <div class="mobile">
          <p><van-tag :type="item.order_state|state_type_filter">{{item.order_state|state_filter}}</van-tag></p>
          <p><van-button v-if="item.order_state=='WAITPAY'" type="info" size="mini" @click="pay(item.id)" >支付</van-button></p>
          <p><van-button v-if="item.order_state=='WAITPAY'" type="danger" size="mini" @click="deleteOrder(item)" >删除</van-button></p>
        </div> 
      </div>
           <van-empty description="没有订单信息"   v-if="list.length==0"/>
    </div>

  </div>
</template>

<script>
import { Dialog } from 'vant';
import {orderList,outpatientPay,orderDelete} from "../../api/api"; 
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
        list:[],
        show:false,
        openid:'',
    };
  },
  computed:{
   
  },
  methods: {
      queryOrderList(){
          orderList({openid:this.openid}).then(res=>{
             this.list = res.data.data
          })
      },
      pay(id){
         this.show = true; 
          outpatientPay({id:id}).then(res=>{ 
              if(res.data.reccnt=='success'){
                //  if(res.data.data.appId!=null){
                 WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      "appId":res.data.data.appId,     //公众号ID，由商户传入     
                      "timeStamp":res.data.data.timeStamp,         //时间戳，自1970年以来的秒数     
                      "nonceStr":res.data.data.nonceStr, //随机串     
                      "package":res.data.data.prepay_id,     
                      "signType":res.data.data.signType,         //微信签名方式：     
                      "paySign":res.data.data.paySign //微信签名 
                    },
                    function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    } 
                }); 
            //  }else{ 
            //        this.show  =false;
            //       Dialog.alert({
            //       title:  '数据提交成功',
            //       message: '数据已提交',
            //       }).then(() => {
            //           this.$router.push({path:`/home`})
            //       });
            //  } 
             }else{
                  this.show  =false;
                  Dialog.alert({
                  title:  '操作失败',
                  message: res.data.message,
                  })
             }
          })
      },
      deleteOrder(item){
          orderDelete({id:item.id}).then(res=>{ 
              if(res.data.reccnt=='success'){
                  Dialog.alert({
                  title:  '删除成功',
                  message: res.data.message,
                  }).then(() => {
                      let index = this.list.findIndex((value)=>{
                            return value.id == item.id
                      })
                      this.list.splice(index,1)
                  });
              }
          })
      },
      fun(val) {
      return Number(val).toFixed(2);
    },
  },
    filters:{
      state_filter(key){
        const stateMap={
          WAITPAY:'等待支付',
          PAYSUCCESS:'支付完成',
          FINISH:'订单完成'
        }
        return stateMap[key]
      },
       state_type_filter(key){
        const stateTypeMap={
          WAITPAY:'warning',
          PAYSUCCESS:'primary',
          FINISH:'success'
        }
        return stateTypeMap[key]
      },

  },
  mounted(){
    this.openid = window.localStorage.getItem("openid");
    this.queryOrderList();
  }

};
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #316de0;
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
.van-hairline--bottom::after {
  border: none;
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
