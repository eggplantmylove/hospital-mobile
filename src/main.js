import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import './assets/css/style.less'

Vue.use(Vant);

Vue.use(Lazyload, {
  preLoad: 1.3,
  attempt: 3
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
