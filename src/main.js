import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import './assets/css/style.less';
import dateFormatter from './util/DateFormatter' 
import FloatFormatter from './util/FloatFormatter';
Vue.use(Vant);
Vue.use(dateFormatter)
Vue.use(FloatFormatter)
Vue.use(Lazyload, {
  preLoad: 1.3,
  attempt: 3
});

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
//   if (to.path === '/'||to.path==='/hospital'||from.path==='/hospital') {
//     next();
//   } else {
//     let token = window.localStorage.token;
//     let hospital_id = window.localStorage.hospital_id;
//     console.log(hospital_id)
//     if (token === 'null' || token === '' || token === undefined) {
//       next('/hospital');
//     }else if(hospital_id === 'null' || hospital_id === '' || hospital_id === undefined) {
//       next('/hospital');
//     }else{
//       next();
//     }
//   }
  let isWeiXin = () => { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 } 
  if(isWeiXin()){
    next();
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
