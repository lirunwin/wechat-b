import Api from '@/services/Api';

export default {

  saveRecruiment: data => Api.post('comp/saveRecuitment', data),

};
