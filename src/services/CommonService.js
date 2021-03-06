import Api from '@/services/Api';

export default {

  getPositions: data => Api.get('common/getPosition', data),

  uploadFile: data => Api.post('common/upload', data),

  getCities: data => Api.get('common/getArea', data),

  getSmsCode: data => Api.get('common/getTelCode', data),

  uploadFile: data => Api.post('common/upload', data)
};
