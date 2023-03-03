// import store from '@/store';
import {
	appRequest
} from '@/utils/request';

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


// import store from '@/store/index.js'
// const url = store.state.url

const {
	yzImageNo,
	chaoshi,
	loginSuc,
	loginNo
} = require('@/utils/msg.js');
const {
	ifBusiness
} = require('@/utils/util.js');

//登录
const loginPas = info => {
	return new Promise((resolve, reject) => {
		uni.request({
			//在 H5 平台或微信小程序平台存在的代码
			// #ifdef H5
			url: url + '/auth/oauth-login/user/token',
			//#endif
			// 仅出现在 App 平台下的代码
			// #ifdef APP-PLUS
			url: getUrl() + '/auth/oauth-login/user/token',
			// #endif
			// url: url + '/login/driver',
			method: 'Post',
			data: info,
			header: {
				'Content-Type': 'application/json',
			},
			success: res => {
				var data = res.data;
				if (data.code == 200) {
					// loginSuc();
					getApp().globalData.storageToken = data.data.access_token;
					uni.setStorage({
						key: 'access_token',
						data: data.data.access_token,
						// unserInfo: data,
					});
					resolve(data.msg);
				} else {
					loginNo(data.msg);
					reject();
				}
			},
			fail: err => {
				chaoshi();
				reject();
			},
		});
	});
};

module.exports = {
	loginPas,
};
