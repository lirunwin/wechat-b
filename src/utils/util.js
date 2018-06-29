import wx from 'wx';
import constants from '@/constants';

const formatTime = (date, fmt = 'yyyy-MM-dd', appendZero = true) => {
  date = new Date(date);
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      if (appendZero) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      } else {
        fmt = fmt.replace(RegExp.$1, o[k]);
      }
    }
  }

  return fmt;
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const starPhoneNumber = phoneNumber => (!phoneNumber || phoneNumber === '' ? ''
  : `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7, 11)}`)

const showToast = (title, icon = 'none', image = '', duration = 2000) => {
  wx.showToast({
    title,
    icon,
    image,
    duration
  })
}
const constantFilter = (name, value) => {
  const constant = constants[name].find(constant => constant.value = value);
  return constant.name || constant.label || '根本没有';
}
export default {
  formatTime,
  starPhoneNumber,
  showToast,
  constantFilter
}
