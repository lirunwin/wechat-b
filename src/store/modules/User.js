import UserService from '@/services/UserService';
import util from '@/utils/util';
import wx from '@/utils/wx';
import constant from '@/constants';
const state = {
  isLogedIn: false,
};
const getters = {
  isLogedIn: (state, payload) => state.isLogedIn,
};
const mutations = {
  logedIn: (state, payload = true) => state.isLogedIn = payload,
};
const actions = {
  signUp(context, payload) {
    return UserService.signUp(payload).then(((res) => {
      // context.commit('', positions);
      console.log(res);
      return res;
    }));
  },
  signIn(context, payload) {
    return UserService.signIn(payload).then(((res) => {
      // context.commit('', positions);
      console.log(res);
      return res;
    }));
  },
  changePwd(context, payload) {
    return UserService.changePwd(payload).then(((res) => {
      // context.commit('', positions);
      console.log(res);
      return res;
    }));
  },
  logout(context, payload) {
    context.commit('logedIn', false);
    wx.removeStorageSync(constant.userKeyName);
    return UserService.logout(payload).then(((res) => {
      console.log(res);
      return res;
    }));
  },

};
export default {
  state,
  getters,
  mutations,
  actions
};
