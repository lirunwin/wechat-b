import Api from '@/services/Api';

export default {

  saveRecruitment: data => Api.post('comp/saveRecuitment', data),

  changeRecruitmentStatus: data => Api.post('comp/setRecuitment', data),

  changeRecruitmentApplyStatus: data => Api.post('comp/setDelivery', data),

  fetchRecruitments: (data = { pageIndex: 1, pageSize: 20 }) => Api.post('comp/recruitmentPage', data),

  fetchRecruitmentDetail: data => Api.get('comp/getRecuitment', data),

  fetchRecruitList: data => Api.post('comp/getDeliveryPage', data)

};
