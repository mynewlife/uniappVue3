// import { url } from '@/config/config.js';
import store from '@/store/index.js'
const url = store.state.url
/**
 * 提示弹窗
 */
const showMessage = msg => {
  uni.showToast({
    title: msg,
    icon: 'none',
  });
};
/**
 * 返回页面或者跳转主页
 */
const getLastPage = function () {
  if (getCurrentPages().length == 1) {
    uni.reLaunch({
      url: '/pages/index',
    });
  } else {
    uni.navigateBack();
  }
};
/**
 * 拨打电话
 */
const makePhoneCall = phone => {
  if (!phone) {
    uni.showToast({
      title: '该馆没有设置联系电话！',
      icon: 'none',
    });
  }
  uni.makePhoneCall({
    phoneNumber: phone,
    success: function (res) {},
    fail: function (err) {},
  });
};
/**
 * 导航
 */
const doNavigate = position => {
  if (!position || !position.latitude || !position.longitude) {
    uni.showToast({
      title: '该馆没有设置地理位置信息！',
      icon: 'none',
    });
  } else {
    // #ifdef H5
    uni.openLocation({
      latitude: position.latitude,
      longitude: position.longitude,
      name: position.name,
    });
    // #endif
    // #ifndef H5
    uni.openLocation({
      latitude: position.latitude,
      longitude: position.longitude,
      name: position.name,
      scale: 28,
    });
    // #endif
  }
};
// 获取定位
const getLocation = fun => {
  let location = getApp().globalData.location;
  if (!location || !location.date || new Date() - location.date > 120000) {
    uni.getLocation({
      type: 'gcj02',
      success: function (res) {
        location = {
          lat: res.latitude,
          lng: res.longitude,
          date: new Date(),
        };
        getApp().globalData.location = location;
        fun.success(location);
      },
      fail: function () {
        if (fun.fail) fun.fail();
      },
    });
    return;
  }
  fun.success(location);
};
//时间转换
const getDateStr = (date = null, x = true) => {
  if (date) {
    var now = new Date(date);
  } else {
    var now = new Date();
  }
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  var formatDate = year + '-' + month + '-' + day;
  if (x) {
    //  如果需要时分秒，就放开
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    formatDate += ' ' + h + ':' + m + ':' + s;
  }
  return formatDate;
};



/**
 * 年纪计算
 *
 * small：出生年龄；large逝世年龄
 */
const getAge = (small, large = null) => {
  let dateLarge,
    dateSmall = new Date(small);
  if (large) {
    dateLarge = new Date(large);
  } else {
    dateLarge = new Date();
  }
  if (dateLarge <= dateSmall) {
    return 0 + '岁';
  }
  let ageDiff = dateLarge.getFullYear() - dateSmall.getFullYear(); //年之差
  let monthDiff = dateLarge.getMonth() - dateSmall.getMonth(); //月之差
  let dayDiff = dateLarge.getDate() - dateLarge.getDate(); //日之差
  if (ageDiff == 0)
    if (monthDiff == 0) {
      return dayDiff + '天';
    } else {
      if (dayDiff >= 0) {
        return monthDiff + '个月';
      } else {
        return monthDiff - 1 + '个月';
      }
    }
  if (ageDiff > 0 && (monthDiff > 0 || (monthDiff == 0 && dayDiff >= 0))) {
    return ageDiff;
  }
  return ageDiff - 1;
};
const isObjectValueEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    var propA = a[propName];
    var propB = b[propName];
    if (typeof propA === 'object') {
      return isObjectValueEqual(propA, propB);
    } else if (propA !== propB) {
      return false;
    }
  }
  return true;
};
//work业务识别
const ifBusiness = info => {
  switch (info.work) {
    //接运
    case '/car':
      info.car();
      break;
    //冷藏
    case '/cold':
      info.cold();
      break;
    //守灵
    case '/mourning':
      info.mourning();
      break;
    //悼念
    case '/mourn':
      info.mourn();
      break;
    //火化
    case '/cremation':
      info.cremation();
      break;
    //审批
    // case "/approval":
    // 	if(info.approval) info.approval();
    // 	break;
    // default:
    // 	return;
  }
};
//除法
const accDiv = (arg1, arg2) => {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  if (t2) {
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return accMul(r1 / r2, Math.pow(10, t2 - t1));
  }
};
//乘法
const accMul = (arg1, arg2) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};
//加法
const accAdd = (arg1, arg2) => {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
};
//减法
const accSubtr = (arg1, arg2) => {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
//储存用户名
const setUserName = userName => {
  getApp().globalData.userName = userName;
  try {
    uni.setStorageSync('userName', userName);
  } finally {
  }
};
//获取用户名
const getUserName = () => {
  let { userName } = getApp().globalData;
  if (userName) {
    return userName;
  }
  try {
    const value = uni.getStorageSync('userName');
    if (value) {
      getApp().globalData.userName = value;
      return value;
    }
  } catch (e) {
    return;
  }
};
//清除用户名
const removeUserName = () => {
  getApp().globalData.userName = null;
  try {
    uni.removeStorageSync('userName');
  } catch (e) {
    // error
  }
};
//获取图片地址
const getImageUrl = imageUrl => {
  if (!imageUrl) {
    return;
  }
  if (imageUrl.indexOf('https://') >= 0 || imageUrl.indexOf('http://') >= 0) {
    return imageUrl;
  }
  return 'http://172.16.0.145:9090' + '/project/profile/' + imageUrl;
};

//富文本
const getRichText = str => {
  return str.replace(/src=\"\/Files\//g, 'src="' + url + '/Files/');
};
//校验手机格式
const checkMobile = mobile => {
  return RegExp(/^1[3456789]\d{9}$/).test(mobile);
};
//身份证验证
const checkIdcard = idcard => {
  var area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };

  var idcard, Y, JYM;
  var S, M, ereg;
  var idcard_array = new Array();
  idcard_array = idcard.split('');
  //地区检验
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    uni.showToast({
      title: '身份证非法',
      icon: 'none',
    });
    return false;
  }
  //身份号码位数及格式检验
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
      } else {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
      }
      if (ereg.test(idcard)) return true;
      else {
        uni.showToast({
          title: '身份证号码出生日期超出范围或含有非法字符',
          icon: 'none',
        });
        return false;
      }
      break;
    case 18:
      //18位身份号码检测
      //出生日期的合法性检查
      //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (
        parseInt(idcard.substr(6, 4)) % 4 == 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
      } else {
        ereg =
          /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        //测试出生日期的合法性
        //计算校验位
        S =
          (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
          (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
          (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
          (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
          (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
          (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
          (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
          parseInt(idcard_array[7]) * 1 +
          parseInt(idcard_array[8]) * 6 +
          parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = 'F';
        JYM = '10X98765432';
        M = JYM.substr(Y, 1); //判断校验位
        if (M == idcard_array[17].toUpperCase()) return true;
        //检测ID的校验位
        else {
          uni.showToast({
            title: '身份证号码校验错误',
            icon: 'none',
          });
          return false;
        }
      } else {
        uni.showToast({
          title: '身份证号码出生日期超出范围或含有非法字符',
          icon: 'none',
        });
        return false;
      }
      break;
    default:
      {
        uni.showToast({
          title: '身份证号码位数不对',
          icon: 'none',
        });
        return false;
      }
      break;
  }
};

/* 时间格式切换 */
const changeTime1 = date => {
  var dateYear,
    dateMouth,
    dateDay,
    nowYear,
    nowMouth,
    nowDay,
    dateStandard,
    nowStandard,
    dateH,
    dateM,
    formatDate;
  var isSubscribe = false;
  dateStandard = new Date(date);
  nowStandard = new Date();
  dateYear = dateStandard.getFullYear();
  dateMouth = dateStandard.getMonth() + 1;
  dateDay = dateStandard.getDate();
  dateH = dateStandard.getHours();
  dateM = dateStandard.getMinutes();
  nowYear = nowStandard.getFullYear();
  nowMouth = nowStandard.getMonth() + 1;
  nowDay = nowStandard.getDate();
  if (
    (nowStandard < dateStandard) &
    (dateYear !== nowYear || dateMouth !== nowMouth || dateDay !== nowDay)
  ) {
    isSubscribe = true;
  }
  if (dateH < 10) {
    dateH = '0' + dateH;
  }
  if (dateM < 10) {
    dateM = '0' + dateM;
  }

  formatDate = dateYear + '年' + dateMouth + '月' + dateDay + '日'

  return {
    isSubscribe,
    formatDate,
  };
};

module.exports = {
  showMessage,
  getLastPage,
  makePhoneCall,
  doNavigate,
  getLocation,
  getDateStr,
  getAge,
  isObjectValueEqual,
  ifBusiness,
  accDiv,
  accMul,
  accAdd,
  accSubtr,
  setUserName,
  getUserName,
  removeUserName,
  getImageUrl,
  getRichText,
  checkMobile,
  checkIdcard,
  changeTime1, //时间转换
};
