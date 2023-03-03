//在 H5 平台或微信小程序平台存在的代码
// #ifdef H5
import {
	url
} from "@/config/config.js";
//#endif
// 仅出现在 App 平台下的代码
// #ifdef APP-PLUS

// #endif

const getUrl = () => {
	let myUrl = getApp().globalData.url;
	if (!myUrl) {
		const value = uni.getStorageSync('urlKey');
		if (!value) {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route
			if ("pages/maintenancePage/maintenancePage" == curRoute) return;
			uni.reLaunch({
				url: "/pages/maintenancePage/maintenancePage"
			})
			return;
		}
		myUrl = getApp().globalData.url = value;
	}
	return myUrl;
}

/**
 * 提示弹窗
 */
const showMessage = (msg) => {
	uni.showToast({
		title: msg,
		icon: "none",
	});
};
/**
 * 返回页面或者跳转主页
 */
const getLastPage = function() {
	if (getCurrentPages().length == 1) {
		uni.reLaunch({
			url: "/pages/index",
		});
	} else {
		uni.navigateBack();
	}
};
/**
 * 拨打电话
 */
const makePhoneCall = (phone) => {
	if (!phone) {
		uni.showToast({
			title: "该馆没有设置联系电话！",
			icon: "none",
		});
	}
	uni.makePhoneCall({
		phoneNumber: phone,
		success: function(res) {},
		fail: function(err) {},
	});
};

/**
 * 导航
 */
const doNavigate = (position) => {
	if (!position || !position.latitude || !position.longitude) {
		uni.showToast({
			title: "该馆没有设置地理位置信息！",
			icon: "none",
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
const getLocation = (fun) => {
	let location = getApp().globalData.location;
	if (!location || !location.date || new Date() - location.date > 120000) {
		uni.getLocation({
			type: "gcj02",
			success: function(res) {
				location = {
					lat: res.latitude,
					lng: res.longitude,
					date: new Date(),
				};
				getApp().globalData.location = location;
				fun.success(location);
			},
			fail: function() {
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
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	var formatDate = year + "-" + month + "-" + day;
	if (x) {
		//  如果需要时分秒，就放开
		var h = now.getHours();
		var m = now.getMinutes();
		var s = now.getSeconds();
		if (h < 10) {
			h = "0" + h;
		}
		if (m < 10) {
			m = "0" + m;
		}
		if (s < 10) {
			s = "0" + s;
		}
		formatDate += " " + h + ":" + m + ":" + s;
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
		return 0 + "岁";
	}
	let ageDiff = dateLarge.getFullYear() - dateSmall.getFullYear(); //年之差
	let monthDiff = dateLarge.getMonth() - dateSmall.getMonth(); //月之差
	let dayDiff = dateLarge.getDate() - dateLarge.getDate(); //日之差
	if (ageDiff == 0)
		if (monthDiff == 0) {
			return dayDiff + "天";
		} else {
			if (dayDiff >= 0) {
				return monthDiff + "个月";
			} else {
				return monthDiff - 1 + "个月";
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
		if (typeof propA === "object") {
			return isObjectValueEqual(propA, propB);
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
};
//work业务识别
const ifBusiness = (info) => {
	switch (info.work) {
		//接运
		case "/car":
			info.car();
			break;
			//冷藏
		case "/cold":
			info.cold();
			break;
			//守灵
		case "/mourning":
			info.mourning();
			break;
			//悼念
		case "/mourn":
			info.mourn();
			break;
			//火化
		case "/cremation":
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
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {}
	if (t2) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return accMul(r1 / r2, Math.pow(10, t2 - t1));
	}
};
//乘法
const accMul = (arg1, arg2) => {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {}
	return (
		(Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
		Math.pow(10, m)
	);
};
//加法
const accAdd = (arg1, arg2) => {
	var r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return (arg1 + arg2) / m;
};
//减法
const accSubtr = (arg1, arg2) => {
	var r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return (arg1 - arg2) / m;
};
//储存用户名
const setUserName = (userName) => {
	getApp().globalData.userName = userName;
	try {
		uni.setStorageSync("userName", userName);
	} finally {}
};
//获取用户名
const getUserName = () => {
	let {
		userName
	} = getApp().globalData;
	if (userName) {
		return userName;
	}
	try {
		const value = uni.getStorageSync("userName");
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
		uni.removeStorageSync("userName");
	} catch (e) {
		// error
	}
};
//获取图片地址
const getImageUrl = (imageUrl) => {
	if (!imageUrl) {
		return;
	}
	if (imageUrl.indexOf("https://") >= 0 || imageUrl.indexOf("http://") >= 0) {
		return imageUrl;
	}
	//在 H5 平台或微信小程序平台存在的代码
	// #ifdef H5
	return url + "/profile/" + imageUrl;
	//#endif
	// 仅出现在 App 平台下的代码
	// #ifdef APP-PLUS
	return getUrl + "/profile/" + imageUrl;
	// #endif
};
//富文本
const getRichText = (str) => {
	return str.replace(/src=\"\/Files\//g, 'src="' + url + "/Files/");
};
//校验手机格式
const checkMobile = (mobile) => {
	return RegExp(/^1[3456789]\d{9}$/).test(mobile);
};
//校验验证邮箱
const isAvailableEmail = (sEmail) => {
	var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(sEmail);
};
//身份证验证
const checkIdcard = (idcard) => {
	var area = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外",
	};

	var idcard, Y, JYM;
	var S, M, ereg;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	//地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null) {
		uni.showToast({
			title: "身份证非法",
			icon: "none",
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
					title: "身份证号码出生日期超出范围或含有非法字符",
					icon: "none",
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
				(parseInt(idcard.substr(6, 4)) % 100 == 0 &&
					parseInt(idcard.substr(6, 4)) % 4 == 0)
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
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1); //判断校验位
				if (M == idcard_array[17].toUpperCase()) return true; //检测ID的校验位
				else {
					uni.showToast({
						title: "身份证号码校验错误",
						icon: "none",
					});
					return false;
				}
			} else {
				uni.showToast({
					title: "身份证号码出生日期超出范围或含有非法字符",
					icon: "none",
				});
				return false;
			}
			break;
		default: {
			uni.showToast({
				title: "身份证号码位数不对",
				icon: "none",
			});
			return false;
		}
		break;
	}
};
// 根据身份证获取生日
const GetBirthday = (psidno) => {
	var birthdayno, birthdaytemp;
	if (psidno.length == 18) {
		birthdayno = psidno.substring(6, 14);
	} else if (psidno.length == 15) {
		birthdaytemp = psidno.substring(6, 12);
		birthdayno = "19" + birthdaytemp;
	} else {
		return "";
	}
	var birthday =
		birthdayno.substring(0, 4) +
		"-" +
		birthdayno.substring(4, 6) +
		"-" +
		birthdayno.substring(6, 8);
	return birthday;
};
// 根据身份证获取性别
const Getsex = (psidno) => {
	var sexno, sex;
	if (psidno.length == 18) {
		sexno = psidno.substring(16, 17);
	} else if (psidno.length == 15) {
		sexno = psidno.substring(14, 15);
	} else {
		return "";
	}
	var tempid = sexno % 2;
	if (tempid == 0) {
		sex = "女";
	} else {
		sex = "男";
	}
	return sex;
};
//时间段
const timeQuantum = (type) => {
	const date = new Date();
	let timestamp = Date.parse(new Date()); //时间戳
	let year = date.getFullYear(); //年
	let month = date.getMonth() + 1; //月
	let day = date.getDate(); //日

	if (type === "start") {
		year = year - 120;
	} else if (type === "end") {
		year = year + 2;
	}
	month = month > 9 ? month : "0" + month;
	day = day > 9 ? day : "0" + day;
	let times = {
		timestamp: timestamp, //时间戳
		currentTime: year + "-" + month + "-" + day, //当前时间
		year: year, //年
		month: month, //月
		day: day, //日
	};
	return times;
};
const unique = (arr) => {
	var result = [];
	arr.forEach(ele => {
		if (result.indexOf(ele) == -1) {
			result.push(ele)
		}
	})
	return result;
}

module.exports = {

	showMessage, //* 提示弹窗
	getLastPage, //* 返回页面或者跳转主页
	makePhoneCall, //* 拨打电话
	doNavigate, //*导航
	getLocation, //* 获取定位
	getDateStr, //*时间转换
	getAge, //* 年纪计算 small：出生年龄；large逝世年龄
	isObjectValueEqual,
	ifBusiness, //* work业务识别
	accDiv, //* 除法
	accMul, //* 乘法
	accAdd, //* 加法
	accSubtr, //* 减法
	setUserName, //* 储存用户名
	getUserName, //* 获取用户名
	removeUserName, //* 清除用户名
	getImageUrl, //* 获取图片地址
	getRichText, //* 富文本
	checkMobile, //* 校验手机格式
	checkIdcard, //* 身份证验证
	isAvailableEmail, //*验证邮箱的正则表达式
	GetBirthday, //* 根据身份证获取生日
	Getsex, //* 根据身份证获取性别
	timeQuantum, //*时间段
	unique, //*数组去重
	getUrl
};
