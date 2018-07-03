import RecruitmentService from '@/services/RecruitmentService';
import { unionBy, remove } from 'lodash';
import util from '@/utils/util';
import constants from '@/constants';

const state = {
  recruitments: [],
  recruitmentsDetails: [],
  standByRecruits: [],
  confirmedRecruits: [],
  currentRecruitment: ''
};
const getters = {
  recruitments: state => state.recruitments,
  recruitmentsDetails: state => state.recruitmentsDetails,
  standByRecruits: state => state.standByRecruits,
  confirmedRecruits: state => state.confirmedRecruits,
  currentRecruitment: state => state.currentRecruitment,
};
const mutations = {

  updateRecruitments: (state, payload) => {
    state.recruitments = unionBy(payload, state.recruitments, 'id')
  },
  updateCurrentRecruitment: (state, payload) => {
    state.currentRecruitment = payload;
  },
  updateRecruitmentsDetails: (state, payload) => {
    // 之后有时间再做缓存吧, 现在就直接覆盖
    const detail = Object.assign({}, payload);
    detail.identitytype = util.constantFilter('identityType', detail.identitytype);
    detail.jobstatus = util.constantFilter('jobStatus', detail.jobstatus);
    detail.jobnature = util.constantFilter('jobNatures', detail.jobnature);
    detail.wageclearing = util.constantFilter('wageClearing', detail.wageclearing);
    detail.wagemode = util.constantFilter('wageMode', detail.wagemode);
    state.recruitmentsDetails = [detail]
  },
  deleteFromRecruitments: (state, id) => {
    const recruitments = state.recruitments.slice();
    remove(recruitments, item => item.id === id);
    state.recruitments = recruitments;
  },
  updateStandByRecruits: (state, payload) => {
    payload.list = payload.list.map((item) => {
      item.activeAction = false;
      item.identitytype = util.constantFilter('identityType', item.identitytype);
      return item;
    });
    const recruit = state.standByRecruits.find(recruit => recruit.recruitmentId === payload.recruitmentId);
    if (!recruit) {
      state.standByRecruits = state.standByRecruits.concat(payload);
    } else {
      state.standByRecruits = state.standByRecruits.map((recruit) => {
        if (recruit.recruitmentId === payload.recruitmentId) {
          recruit.list = unionBy(payload.list, recruit.list, 'deliveryId')
        }
        return recruit;
      })
    }
  },
  updateRecruits: (state, { id, pid }) => {

  },
  updateConfirmedRecruits: (state, payload) => {
    payload.list = payload.list.map((item) => {
      item.identitytype = util.constantFilter('identityType', item.identitytype);
      return item;
    });
    const recruit = state.confirmedRecruits.find(recruit => recruit.recruitmentId === payload.recruitmentId);
    if (!recruit) {
      state.confirmedRecruits = state.confirmedRecruits.concat(payload);
    } else {
      state.confirmedRecruits = state.confirmedRecruits.map((recruit) => {
        if (recruit.recruitmentId === payload.recruitmentId) {
          recruit.list = unionBy(payload.list, recruit.list, 'deliveryId')
        }
        return recruit;
      })
    }
  },
  resetRecruitmentState: (state) => {
    // state.recruitments = [];
    state.recruitmentsDetails = [];
    state.standByRecruits = [];
    state.confirmedRecruits = [];
  },
};
const actions = {
  fetchRecruitments({ commit }, payload) {
    return RecruitmentService.fetchRecruitments(payload).then((recruitments) => {
      // console.log({ recruitments });
      commit('updateRecruitments', recruitments);
      return recruitments || [];
    });
  },
  saveRecruitment(context, payload) {
    return RecruitmentService.saveRecruitment(payload).then((res) => {
      if (res) {
        payload.id = res
      }
      context.commit('updateRecruitments', [payload]);
      return payload;
    });
  },
  cancelRecruitment({ commit }, id) {
    const status = util.constantHelper('recruitmentStatus', 'CANCEL');
    if (!status) {
      util.showToast('数据有误,请稍后再试');
      return;
    }
    return RecruitmentService.changeRecruitmentStatus({ id, status }).then((res) => {
      commit('deleteFromRecruitments', id);
      if (res.msg) util.showToast(res.msg)
    });
  },
  agreeApply: ({ commit }, payload) => {
    const deliveryStatus = util.constantHelper('recruitmentApplyStatus', 'AGREE');
    if (!deliveryStatus) {
      util.showToast('数据有误,请稍后再试');
      return;
    }
    return RecruitmentService.changeRecruitmentApplyStatus({ id: payload.id, deliveryStatus }).then((res) => {
      // commit('updateRecruits', payload);  目前就直接刷新算了
      if (res.msg) util.showToast(res.msg);
    })
  },
  rejectApply: ({ commit }, payload) => {
    const deliveryStatus = util.constantHelper('recruitmentApplyStatus', 'REJECT');
    if (!deliveryStatus) {
      util.showToast('数据有误,请稍后再试');
      return;
    }
    return RecruitmentService.changeRecruitmentApplyStatus({ id: payload.id, deliveryStatus }).then((res) => {
      // commit('updateRecruits', payload);  目前就直接刷新算了
      if (res.msg) util.showToast(res.msg);
    })
  },
  fetchRecruitmentDetail({ commit }, payload) {
    return RecruitmentService.fetchRecruitmentDetail(payload).then((recruitment) => {
      recruitment.pid = payload.id
      commit('updateRecruitmentsDetails', recruitment);
      return recruitment;
    });
  },
  fetchStandByRecruits({ commit }, payload) {
    return RecruitmentService.fetchRecruitList(payload).then((recruits) => {
      const list = recruits.content;
      if (list) {
        const obj = {
          recruitmentId: payload.recruitmentId,
          list
        }
        commit('updateStandByRecruits', obj);
      }
      return list || [];
    });
  },
  fetchConfirmedRecruits({ commit }, payload) {
    return RecruitmentService.fetchRecruitList(payload).then((recruits) => {
      const list = recruits.content;
      if (list) {
        const obj = {
          recruitmentId: payload.recruitmentId,
          list
        }
        commit('updateConfirmedRecruits', obj);
      }
      return list || [];
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
