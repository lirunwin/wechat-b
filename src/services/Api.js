import wx from '@/utils/wx';
import WX from '@/utils/promiseWX';
import constant from '@/constants';
import store from '@/store';
import Fly from 'flyio';

const request = new Fly();

request.config.baseURL = 'https://local.sapi.s-cout.com/zcb-api/';

request.interceptors.request.use((request) => {
  // if(util.checkLogin)
  request.headers['X-Requested-With'] = 'WX_APPLETS';
  request.headers.user_author = wx.getStorageSync(constant.userKeyName) || '';
  // console.log(request);
  wx.showNavigationBarLoading();
  wx.showLoading({
    title: '加载中',
  })
  return request;
});

request.interceptors.response.use(
  (response, promise) => {
    // console.log({ response });
    wx.hideNavigationBarLoading();
    wx.hideLoading()
    const res = response.data;
    if (res.msg === 'WSXX') {
      return promise.resolve(res);
    }
    if (res.code === 1) {
      if (res.data === null) {
        return promise.resolve([]);
      }
      if (res.data) {
        return promise.resolve(res.data);
      }
      return promise.resolve(res);
    } else if (res.code === 4000004 || res.code === 100002) {
      WX.showModal({
        title: '温馨提示',
        content: res.code === 100002 ? '用户名或密码错误' : '登录超时请重新登录，请重新登录'
      }).then(() => {
        wx.redirectTo({
          url: '../login/login',
        });
      });
    }
    if (res.msg) {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      });
    }
    return promise.reject(res);
  },
  (err, promise) => {
    wx.hideNavigationBarLoading();
    wx.showToast({
      title: err.message,
      icon: 'none',
    });
    return promise.reject();
  },
);

export default request;
