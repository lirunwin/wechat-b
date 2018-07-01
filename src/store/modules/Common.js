import CommonService from '@/services/CommonService';
import util from '@/utils/util';
const state = {
  positions: [],
  cities: []
};
const getters = {
  positions: state => state.positions,
  cities: state => state.cities,
  positionParents: (state) => {
    const temp = state.positions.filter(position => position.pid === '0' || position.pid === '');
    // console.log(JSON.stringify(state.positions, null, 2));
    return temp;
  },
};
const mutations = {
  updatePositions: (state, payload) => state.positions = state.positions.concat(payload),
  updateCities: (state, payload) => state.cities = state.cities.concat(payload),
};
const actions = {
  getPositions(context, payload) {
    return CommonService.getPositions(payload).then(((positions) => {
      context.commit('updatePositions', positions);
      return positions;
    }));
  },
  getCities(context, payload) {
    return CommonService.getCities(payload).then(((cities) => {
      // console.log('我在这儿去去去', JSON.stringify(cities, null, 2));
      context.commit('updateCities', cities);
      return cities;
    }));
  },
  getSmsCode(context, {tel, type}) {
    let codeType = util.constantHelper('smsType', type);
    if (codeType) {
      return CommonService.getSmsCode({tel, codeType}).then(res => {
        console.log(res);
      });
    } else {
      console.log('验证码codeType错误');
    }
  },
  uploadFile(context, payload) {
    return CommonService.uploadFile(payload).then((res => res));
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
