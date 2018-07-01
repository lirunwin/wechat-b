import Vue from 'vue';
import store from '@/store';
import App from '@/App';
import MpvueRouterPatch from 'mpvue-router-patch';

Vue.config.productionTip = false;
Vue.use(MpvueRouterPatch);

const app = new Vue({
  store,
  ...App,
});
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/user/sigiup',
      // '^pages/recruitment/post',
    ], // Will be filled in webpack
    window: {
      // backgroundTextStyle: 'light',
      // navigationBarBackgroundColor: '#acc192',
      // navigationBarTitleText: '懒虫动动兼职平台',
      // navigationBarTextStyle: 'white',


      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '懒虫动动兼职平台',
      navigationBarTextStyle: 'black',

      // backgroundTextStyle: 'light',
      // backgroundColor: '#d22222',
      // backgroundColorTop: '#d22222',
      // navigationBarBackgroundColor: '#d22222',
      // navigationBarTitleText: '懒虫动动',
      // navigationBarTextStyle: 'white',
    },
    // tabBar: {
    //   color: '#999',
    //   selectedColor: '#d22222',
    //   backgroundColor: '#fff',
    //   borderStyle: 'black',
    //   // list: [{
    //   //   pagePath: 'pages/user/signin',
    //   //   text: '登录',
    //   //   iconPath: 'static/assets/news.png',
    //   //   selectedIconPath: 'static/assets/news-active.png',
    //   // }, {
    //   //   pagePath: 'pages/quanzi/list',
    //   //   text: '圈子',
    //   //   iconPath: 'static/assets/quanzi.png',
    //   //   selectedIconPath: 'static/assets/quanzi-active.png',
    //   // }],
    // },
  },
};
