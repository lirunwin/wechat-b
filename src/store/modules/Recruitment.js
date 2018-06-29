import RecruitmentService from '@/services/RecruitmentService';

const state = {
  recruitments: [],
  recruitmentsDetails: []
};
const getters = {
  recruitments: state => state.recruitments,
  recruitmentsDetails: state => state.recruitmentsDetails,
};
const mutations = {
  updateRecruitments: (state, payload) => {
    state.recruitments = state.recruitments.concat(payload);
  },
};
const actions = {
  fetchRecruitments({ commit }, payload) {
    return RecruitmentService.fetchRecruitments(payload).then((recruitments) => {
      commit('updateRecruitments', recruitments);
      return recruitments;
    });
  },
  saveRecruitment(context, payload) {
    return RecruitmentService.saveRecruitment(payload).then((res) => {
      if (res) {
        payload.id = res
      }
      context.commit('updateRecruitments', [recruitments]);
      return payload;
    });
  },
  fetchRecruitmentDetail({ commit }, payload) {
    return RecruitmentService.fetchRecruitmentDetail(payload).then((recruitment) => {
      console.log(recruitment);
      return recruitment;

      // commit('updateRecruitments', recruitment);
    });
  },
  fetchRecruitList({ commit }, payload) {
    return RecruitmentService.fetchRecruitList(payload).then((recruits) => {
      console.log(recruits);
      return recruits;

      // commit('updateRecruitments', recruitment);
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
