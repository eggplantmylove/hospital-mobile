import axios from 'axios'; 

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8181/api',
    //  baseURL: ' http://192.168.0.100:8181/api',
    // baseURL: 'http://hcdyrmyy.bofan.vip/api/',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'Client-Version': 'web-0.0.1',
        'uuid': 'web',
        'uuidKey': '201804082117257059'
    }
    
});
instance.interceptors.request.use(function (config) {
    config.data=JSON.stringify(config.data);
    var token=localStorage.getItem("token");
    config.headers.authorization=token;
    return config;
}, function (error) {
    console.log(error)
    // 对请求错误做些什么
    return Promise.reject(error);
});

// http response 拦截器
instance.interceptors.response.use(
    response => {
      //拦截响应，做统一处理  
   
      if (response.data.code) {
        switch (response.data.code) {
          case 1002:
            // store.state.isLogin = false
            // router.replace({
            //   path: 'login',
            //   query: {
            //     redirect: router.currentRoute.fullPath
            //   }
            // })
        }
      }
      return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => { 
        if(error.response.status=='403'){
          this.$router.push('/home')
        }
      return Promise.reject(error.response.status) // 返回接口返回的错误信息
})


//患者信息

export const patLogin = data => { return instance(`/login`, { data:data,method:'post' }); };

export const patList = params => { return instance.get(`/outpatient/pat-list`, { params: params }); };
export const patAdd = data => { return instance(`/admin/pat-info`, { data:data,method:'post' }); };
export const patEdit = data => { return instance(`/admin/pat-info`, { data:data,method:'put' }); };
export const patRemove = data => { return instance(`/admin/pat-info/`+data.id, {method:'delete' }); };


//手机端
//获取部门消息
export const getOpenid = data =>{ return instance('weixin',{data:data,method:'post'})}

export const mobileDept = params => { return instance.get(`/outpatient/dept`, { params: params }); };
//获取排班医生信息
export const getAppointmentList = params => { return instance.get(`/outpatient/appointment-list`, { params: params }); };
export const getLisList = params => { return instance.get(`/outpatient/lis-list`, { params: params }); }; 
export const getLisDetail = params => { return instance.get(`/outpatient/lis-detail`, { params: params }); }; 


export const getRegisterList = params => { return instance.get(`/outpatient/register-list`, { params: params }); };
export const queryPatInfo = params => { return instance.get(`/outpatient/pat-info`, { params: params }); };
export const mobileSavePatInfo = data => { return instance(`/outpatient/pat-info`, { data:data,method:'post' }); };
export const mobileOutpatientDoctor = params => { return instance.get(`/outpatient/doctor`, { params: params }); };
export const mobileRegisterDoc = params => { return instance.get(`/outpatient/register`, { params: params }); };
export const registerConfirm = data => { return instance(`/outpatient/register-confirm`, { data:data,method:'post' }); };
export const mobileResDetail = params => { return instance.get(`/outpatient/res-detail`, { params: params }); };
export const pendingPay = params => { return instance.get(`/outpatient/pending-pay`, { params: params }); };
export const pendingPayOther = params => { return instance.get(`/outpatient/pending-other`, { params: params }); };
export const outpatientRecord = params => { return instance.get(`/outpatient/outpatient-record`, { params: params }); };
export const outpatientPay = data => { return  instance(`/outpatient/pay`, { data:data,method:'post' });};
export const outpatientPayHesuan = data => { return  instance(`/outpatient/pay-hesuan`, { data:data,method:'post' });};
export const payScanQrcode = data => { return  instance(`/outpatient/pay-scan-qrcode`, { data:data,method:'post' });};
export const mobilePatAdd = params => { return instance.get(`/outpatient/res-detail`, { params: params }); };
//获取医院信息
export const hospitalList = params =>{return instance.get('/hospital-info',{params:params}); };
export const hospitalOne = data =>{return instance.get('/hospital-info/'+data.id); };


//订单消息
export const orderList = params =>{return instance.get('/outpatient/order-list',{params:params}); };

export const orderDelete = data => { return instance(`/outpatient/order-delete`, { data:data,method:'put'}); };
//获取医生信息
export const docList = params =>{return instance.get('/doctor',{params:params}); };

//-------------------------住院部分-----------------

export const mobileHospitalizaitonList = params => { return instance.get(`/hospitalization`, { params: params }); };

export const mobileHospitalizaitonRecharge= data => { return instance.get(`/hospitalization/recharge`, { data:data,method:'post' }); };
export const mobileHospitalizaitonDetail= params => { return instance.get(`/hospitalization/detail`, { params: params }); };
export const hospitalizaitonRecharge = data => { return  instance(`/hospitalization/recharge`, { data:data,method:'post' });};
export const smsSend = data => { return  instance(`/outpatient/send-sms`, { data:data,method:'post' });};
