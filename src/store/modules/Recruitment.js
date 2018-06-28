import RecruitmentService from '@/services/RecruitmentService';

const state = {
  // positions: []
};
const getters = {
  // positions: state => state.positions,
  // positionParents: (state) => {
  //   const temp = state.positions.filter(position => position.pid === '0' || position.pid === '')
  //   console.log(JSON.stringify(state.positions, null, 2));
  //   return temp;
  // },
};
const mutations = {
  // updatePositions: (state, payload) => {
  //   state.positions = state.positions.concat(payload);
  // },
};
const actions = {
  // getPositions(context, payload) {
  //   return RecruitmentService.getPositions(payload).then(((positions) => {
  //     context.commit('updatePositions', positions);
  //     return positions;
  //   }));
  // },
  // // uploadFile(context, payload) {
  // //   return CommonService.uploadFile(payload).then((res => res));
  // // }
};
export default {
  state,
  getters,
  mutations,
  actions
};
