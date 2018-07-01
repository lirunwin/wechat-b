import Api from '@/services/Api';

export default {

  signUp: data => Api.post('comp/register', data),

  signIn: data => Api.post('comp/login', data),

  logout: () => Api.post('user/exitOut'),

  changePwd: (data) => Api.post('user/setPassword', data)
};
