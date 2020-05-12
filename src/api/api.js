import axios from 'axios'; 

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8181/api',
    // baseURL: 'https://sx.gxnnks.com/api',
    timeout: 2000,
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

    // 对请求错误做些什么
    return Promise.reject(error);
});

instance.interceptors.response.use(function (config) {
    if(config.status=='403'){
        window.location.href='/#/login';
      }
    return config;
}, function (error) {

    // 对请求错误做些什么
    return Promise.reject(error);
});

//品牌
export const doctorList = params => { return instance.get(`/doctor`, { params: params }); };
export const brandAdd = data => { return instance(`/brand`, { data:data,method:'post' }); };
export const brandEdit = data => { return instance(`/brand`, { data:data,method:'put' }); };
export const brandRemove = data => { return instance(`/brand/`+data.id, {method:'delete' }); };

//患者信息
export const patList = params => { return instance.get(`/pat-info`, { params: params }); };
export const patAdd = data => { return instance(`/pat-info`, { data:data,method:'post' }); };
export const patEdit = data => { return instance(`/pat-info`, { data:data,method:'put' }); };
export const patRemove = data => { return instance(`/pat-info/`+data.id, {method:'delete' }); };


//手机端
//获取部门消息
export const mobileDept = params => { return instance.get(`/outpatient/dept`, { params: params }); };
//获取排班医生信息
export const mobileOutpatientDoctor = params => { return instance.get(`/outpatient/doctor`, { params: params }); };

export const mobileResDetail = params => { return instance.get(`/outpatient/res-detail`, { params: params }); };

export const mobilePatAdd = params => { return instance.get(`/outpatient/res-detail`, { params: params }); };