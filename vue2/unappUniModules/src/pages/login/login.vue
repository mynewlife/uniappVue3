<template>
	<view>
		<image src="@/static/img/bg_login.png" mode="" style="width: 750rpx; height: 350rpx"></image>
		<view class="wel" @click="tzClick">您好，</view>
		<view class="wel" style="padding-top: 10rpx">欢迎登录磨盘山公墓</view>
		<form @submit="onLongin">
			<view class="in_login">
				<view>
					<input placeholder-class="font_v30 color_v14" maxlength="20" placeholder="员工工号"
						:value="cache.username" confirm-type="next" name="username" @blur="blurUser" />
				</view>
				<view>
					<input placeholder-class="font_v30 color_v14" password maxlength="20" placeholder="登录密码"
						:value="cache.password" confirm-type="done" name="password" @blur="blurPa" />
				</view>
			</view>
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox color="#1C9EF5" :checked="cache.type" style="transform: scale(0.7)" />
					记住密码
				</label>
			</checkbox-group>
			<view class="foot_login">
				<button class="but_solid" form-type="submit">登录</button>
			</view>
		</form>
		<view class="foot">技术支持：智慧九州 028-66322410</view>
	</view>
</template>

<script>
	var that;
	const CryptoJS = require('crypto-js');
	import {
		loginPas
	} from '@/api/login.js';
	import {
		userUserMe, // 获取当前登陆用户信息
	} from '@/api/apiApp.js';
	import {
		showMessage
	} from '@/utils/msg.js';
	export default {
		data() {
			return {
				cache: {
					username: '',
					password: '',
					type: true,
				},
				storage_user_pas: false,
				num: 0,
			};
		},
		onLoad() {
			let token = getApp().globalData.storageToken;
			if (!token) {
				try {
					token = uni.getStorageSync('access_token');
					if (token) {
						getApp().globalData.storageToken = token;
					}
				} catch (e) {}
			}
			//已登录自动跳转其他页面
			if (token) {
				this.isLogin = true;
				uni.redirectTo({
					url: '/pages/socket/index',
					passedParams: {
						info: '已登录',
					},
				});
			}
			that = this;
			uni.getStorage({
				key: 'storage_user_pas',
				success: function(res) {
					if (res.data.username && res.data.password) {
						that.cache.username = res.data.username;
						that.cache.password = res.data.password;
						that.storage_user_pas = true;
					}
				},
			});
		},
		methods: {
			tzClick() {
				// 仅出现在 App 平台下的代码
				// #ifdef APP-PLUS
				this.num++
				if (this.num >= 20) {
					uni.navigateTo({
						url: '/pages/maintenancePage/maintenancePage',
					});
				}
				// #endif

			},
			// 验证账号
			blurUser(e) {
				if (!e.detail.value) {
					uni.showToast({
						title: '请输入账号',
						icon: 'none',
					});
					return;
				}
			},
			blurPa(e) {
				if (!e.detail.value) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
					});
					return;
				}
			},
			// 是否记住密码
			checkboxChange(e) {
				this.cache.type = !this.cache.type;
			},
			// 登录
			onLongin(e) {
				if (!e.detail.value.username) {
					uni.showModal({
						content: '请输入账号！',
						showCancel: false,
					});
					return;
				} else if (!e.detail.value.password) {
					uni.showModal({
						content: '请输入密码！',
						showCancel: false,
					});
					return;
				}

				function encrypt(word) {
					let key = CryptoJS.enc.Utf8.parse('ABCDEFGHIJKL_key'); //十六位十六进制数作为密钥
					let iv = CryptoJS.enc.Utf8.parse('ABCDEFGHIJKLM_iv');
					let srcs = CryptoJS.enc.Utf8.parse(word);
					let encrypted = CryptoJS.AES.encrypt(srcs, key, {
						iv: iv,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7,
					});
					return encrypted.toString();
				}
				uni.showLoading({
					title: '正在登录...',
				});
				loginPas({
						username: e.detail.value.username,
						password: encrypt(e.detail.value.password),
						scope: 'server',
						clientId: 'server',
						clientSecret: '123456',
						grantType: 'password',
					})
					.then(res => {
						uni.reLaunch({
							url: '/pages/index/index'
						});
						uni.hideLoading();
						if (that.cache.type) {
							uni.setStorage({
								key: 'storage_user_pas',
								data: {
									username: e.detail.value.username,
									password: e.detail.value.password,
								},
							});
						} else {
							if (that.storage_user_pas) {
								uni.removeStorage({
									key: 'storage_user_pas',
								});
							}
						}
						// this.getUserUserMe();
					})
					.catch(err => {
						uni.hideLoading();
					});
			},
			getUserUserMe() {
				userUserMe({})
					.then(response => {
						let author = false
						for (let index = 0; index < response.authorities.length; index++) {
							let element = response.authorities[index].authority;
							if (element === 'cemeTask') {
								uni.reLaunch({
									url: '/pages/index/index'
								});
								author = true
							} else if (element === 'patrol' && response.authorities.length < 2) {
								uni.reLaunch({
									url: '/pages/patrol/patrol?authorities=' + 'patrol'
								});
								author = true
							}
						}
						if (author === false) {
							uni.showToast({
								title: '暂无登录权限',
								icon: 'none'
							});
						}
					})
					.catch(msg => {
						uni.showToast({
							title: msg.msg,
							icon: 'none'
						});
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #ffffff;
	}

	.foot_login {
		width: 750rpx;
		position: fixed;
		left: 0;
		bottom: 70rpx;
		height: 98rpx;
	}

	.wel {
		padding: 86rpx 0 0 88rpx;
		font-size: 40rpx;
		line-height: 62rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #353535;
	}

	.but_solid {
		text-align: center;
		margin: 0 24rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: linear-gradient(180deg, #1c9ef5 0%, #2486f5 100%);
		box-shadow: 0px 3rpx 6rpx rgba(32, 145, 219, 0.4);
		border-radius: 10rpx;
		color: #fff;
		font-size: 30rpx;
	}

	.in_login {
		margin-top: 60rpx;
		padding: 0 88rpx;
	}

	checkbox-group {
		padding: 50rpx 0 0 88rpx;
		font-weight: 400;
		font-size: 20rpx;
		color: #353535;
	}

	.in_login>view {
		/* margin-top: 45rpx; */
		border-bottom: 2rpx solid #cccccc;
		padding: 55rpx 0 22rpx;
	}

	.in_login input {
		color: #353535;
		font-size: 30rpx !important;
	}

	.foot {
		text-align: center;
		width: 750rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		color: #b7b7b7;
		position: fixed;
		bottom: 18rpx;
	}
</style>
