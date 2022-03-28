import Vue from 'vue'
const float_format = (value) => { //日期类型
    return Number(value).toFixed(2);
   
}
export default function (Vue) {
    Vue.prototype.$floatFormatter = {
        float_format
    }
}