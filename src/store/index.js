import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import resourceStore from './modules/resourceStore'
import patInfoStore from './modules/patInfoStore'
import hospitalStore from './modules/hospitalStore'
import doctorStore from './modules/doctorStore'
Vue.use(Vuex);
export default new Vuex.Store({
     getters,
     modules:{
          patInfoStore,
          resourceStore,
          hospitalStore,
          doctorStore
     }
 })