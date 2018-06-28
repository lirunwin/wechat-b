// import axios from 'axios';
// // import store from '@/store';
// // import data from '@/mockdata/scoreTags';
// const instance = axios.create({
//   baseURL: 'https://local.sapi.s-cout.com/zcb-api/',
//   // timeout: 1
//   // timeout: 1000,
//
// });
// instance.interceptors.response.use((response) => {
//   // TODO: some auth stuff
//   const data = response.data.data;
//   if (data) {
//     return data;
//   }
//   return response.data;
// }, error =>
//   // return {
//   //   content: data
//   // };
//   Promise.reject(error)
// );
//
// export default instance;

import wx from '@/utils/wx';
import Fly from 'flyio';

const request = new Fly();

request.config.baseURL = 'https://local.sapi.s-cout.com/zcb-api/'

request.interceptors.request.use((request) => {
  request.headers['X-Tag'] = 'flyio';
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
