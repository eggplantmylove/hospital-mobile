<template>
  <div></div>
</template>

<script>  
    export default {
        name: 'index',
        data() {
            
            return {
                // myNav:this.$router.options.routes.find(item => item.children.path === '/home').children,
                // 顶部导航
                patList:[],
                openid:'',
                codewx:''
            }
        },
        computed:{
          
        },
        methods:{
           
            async getOpenid(){
                // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb360feb2dfe1f98a&redirect_uri=http%3A%2F%2Ftestzj.gxbjkj2019.com%2F%23%2Fsalary-list&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
                
                let openid = window.localStorage.getItem("openid");
                if (openid !== 'null' && openid !== undefined && openid !== '') { 
                       this.$router.replace("/home")
                }else{
                     this.codewx = window.location.search.split("&")[0].split("=")[1];
                     window.localStorage.setItem("code",this.codewx)
                     this.$router.replace("/hospital")
                     let data = {"code":this.codewx,"hospital_id":'c57f0ccc5fd60779d517f397fc312998'}; 
                     await getOpenid(data).then(res=>{    
                                this.openid  = res.data.data.openid;
                                window.localStorage.setItem("openid",this.openid );
                                
                    })
                    let params = {"username":this.openid,"password":this.openid}  
                        await patLogin(params).then(res=>{  
                            window.localStorage.setItem("token",res.headers.authorization)
                   })
                }
               
            }
        },
        mounted:function(){
            this.getOpenid();
        }
    }
</script>

<style scoped lang="less">
    /deep/ .van-grid-item {
    }

    .top-box {
        display: flex;
        align-items: center;
        padding-left: 10px;
        .round-box {
            margin-right: 15px;
        }
        .text {
            p {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .content-title {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: #fff;
        p {
            font-size: 14px;
        }
    }

    .round-box {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        .iconfont {
            font-size: 26px;
            color: #fff;
        }
    }
</style>
