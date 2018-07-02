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
      // '^pages/user/signin',
      '^pages/recruitment/index',
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
    tabBar: {
      color: '#999',
      selectedColor: '#9fb485',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/recruitment/index',
        text: '招聘信息',
        iconPath: 'static/img/tab1.png',
        selectedIconPath: 'static/img/tab1_active.png',
      },
      {
        pagePath: 'pages/recruitment/post',
        iconPath: 'static/img/tab2.png',
        selectedIconPath: 'static/img/tab2.png',
      },
      {
        pagePath: 'pages/user/center',
        text: '账户信息',
        iconPath: 'static/img/tab3.png',
        selectedIconPath: 'static/img/tab3_active.png',
      }
      ],
    },
  },
};
