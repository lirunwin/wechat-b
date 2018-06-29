import wx from '@/utils/wx';
import Fly from 'flyio';

const request = new Fly();

request.config.baseURL = 'https://local.sapi.s-cout.com/zcb-api/'

request.interceptors.request.use((request) => {
  request.headers['X-Tag'] = 'flyio';
  request.headers['X-Requested-With'] = 'WX_APPLETS';
  request.headers.user_author = 'rtARpG9wP94NckMoEBJB3lPjUouPhZLzpRClY/NaNm2snHsPsOdkOhxmHNderBAV2Yd8zW3cZhpUaXuKSHIWfQ==';
  wx.showNavigationBarLoading();
  return request;
});

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading();
    const res = response.data;
    if (res.code === 1) {
      return promise.resolve(res.data);
    }
    wx.showToast({
      title: res.msg,
      icon: 'none',
    });
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
