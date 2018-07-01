import Vuex from 'vuex';
import Vue from 'vue';
import Recruitment from './modules/Recruitment';
import Common from './modules/Common';
import User from './modules/User';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Recruitment,
    Common,
    User
  }
});
