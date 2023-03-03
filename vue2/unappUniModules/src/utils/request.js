// 请求api的基础路径
// import { url } from '@/config/config.js';
// import store from '@/store/index.js'
// const url = store.state.url


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
/**
 * 统一的请求封装
 * @param {String} api 请求的api地址
 * @param {JSON} params 请求携带的参数
 * @param {String} methods 请求方式，默认GET
 * @param {boolean} [loading=true] 是否显示loading，默认true
 */

const guoQi = (type = false) => {
	if (!type) {
		delete getApp().globalData.storageToken;
		uni.removeStorage({
			key: 'access_token',
		});
	}
	uni.showModal({
		title: '提示',
		content: '您的登录已过期，请重新登录',
		showCancel: false,
		success: res => {
			if (res.confirm) {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}
		},
	});
};

const appRequest = (api, params = {}, method = 'GET', contentType = false) => {
	return new Promise((resolve, reject) => {
		let token = getApp().globalData.storageToken;
		if (!token) {
			try {
				token = uni.getStorageSync('access_token');
				if (!token) {
					guoQi();
					reject({
						code: 98,
					});
					return;
				}
				getApp().globalData.storageToken = token;
			} catch (e) {
				guoQi();
				reject({
					code: 98,
				});
				return;
			}
		}
		let headerM = {
			Authorization: 'bearer' + token,
		};
		if (contentType) {
			headerM['Content-Type'] =
				'application/x-www-form-urlencoded;charset=UTF-8';
		}
		uni.request({
			//在 H5 平台或微信小程序平台存在的代码
			// #ifdef H5
			url: url + api,
			//#endif
			// 仅出现在 App 平台下的代码
			// #ifdef APP-PLUS
			url: getUrl() + api,
			// #endif
			data: params,
			header: headerM,
			method: method,
			dataType: 'json',
			success: res => {
				let data = res.data;
				if (!data.code) {
					resolve(data);
				} else if (data.code == 401) {
					guoQi();
					reject();
				} else if (data.code == 200) {
					resolve(data.data); // 接收res并传到then的参数中去
				} else {
					reject(data);
				}
			},
			fail: err => {
				reject({
					code: 99,
					msg: err,
				});
			},
		});
	});
};

const formDataRequest = (
	api,
	params = {},
	method = 'POST',
	contentType = false
) => {
	return new Promise((resolve, reject) => {
		let token = getApp().globalData.storageToken;
		if (!token) {
			try {
				token = uni.getStorageSync('access_token');
				if (!token) {
					guoQi();
					reject({
						code: 98,
					});
					return;
				}
				getApp().globalData.storageToken = token;
			} catch (e) {
				guoQi();
				reject({
					code: 98,
				});
				return;
			}
		}
		let headerM = {
			Authorization: token,
		};
		if (contentType) {
			headerM['Content-Type'] = 'application/x-www-form-urlencoded';
		}
		uni.request({
			//在 H5 平台或微信小程序平台存在的代码
			// #ifdef H5
			url: url + api,
			//#endif
			// 仅出现在 App 平台下的代码
			// #ifdef APP-PLUS
			url: getUrl() + api,
			// #endif
			data: params,
			header: headerM,
			method: method,
			dataType: 'json',
			success: res => {
				let data = res.data;
				if (data.code == 401) {
					guoQi();
					reject();
				} else if (data.code == 200) {
					resolve(data.data); // 接收res并传到then的参数中去
				} else {
					reject(data);
				}
			},
			fail: err => {
				reject({
					code: 99,
					msg: err,
				});
			},
		});
	});
};

//上传图片
const uploadFiles = (api, images, params = {}, imgName = 'image') => {
	return new Promise((resolve, reject) => {
		if (!images) {
			reject({
				code: 90,
				msg: '没有图片,请重新操作',
			});
			return;
		}
		let token = getApp().globalData.storageToken;
		if (!token) {
			try {
				token = uni.getStorageSync('storage_token');
				if (!token) {
					guoQi();
					reject({
						code: 98,
					});
					return;
				}
				getApp().globalData.storageToken = token;
			} catch (e) {
				guoQi();
				reject({
					code: 98,
				});
				return;
			}
		}
		uni.uploadFile({
			//在 H5 平台或微信小程序平台存在的代码
			// #ifdef H5
			url: url + api,
			//#endif
			// 仅出现在 App 平台下的代码
			// #ifdef APP-PLUS
			url: getUrl() + api,
			// #endif
			header: {
				Authorization: 'Bearer' + token,
			},
			filePath: images,
			name: imgName,
			formData: params,
			success: res => {
				let data = res.data;
				if (typeof data == 'string') {
					data = JSON.parse(data);
				}
				if (data.code == 401) {
					guoQi();
					reject();
				} else if (data.code == 200) {
					resolve(data); // 接收res并传到then的参数中去
				} else {
					reject(data);
				}
			},
			fail: err => {
				reject({
					code: 99,
					msg: err,
				});
			},
		});
	});
};

module.exports = {
	appRequest,
	uploadFiles,
	formDataRequest,
};
