
//在 H5 平台或微信小程序平台存在的代码
// #ifdef H5
import {
	url
} from "@/config/config.js";
//#endif
// 仅出现在 App 平台下的代码
// #ifdef APP-PLUS
import {
	getUrl
} from '@/utils/util.js';
// #endif

//GPS登录
const gpsLogin = (info) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: gpsUrl + '/GetDateServices.asmx/loginSystem',
			data: info,
			method: 'GET',
			dataType: 'json',
			success: (res) => {
				var data = res.data;
				if (data.errorCode == 200) {
					resolve(data);
				} else {
					reject(data);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	})
}
//获取历史轨迹
const trajectory = (info) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: gpsUrl + '/GetDateServices.asmx/GetDate',
			data: info,
			method: 'GET',
			dataType: 'json',
			success: (res) => {
				var data = res.data;
				resolve(data);
			},
			fail: (err) => {
				reject(err);
			}
		});
	})
}

module.exports = {
	gpsLogin,
	trajectory
}
