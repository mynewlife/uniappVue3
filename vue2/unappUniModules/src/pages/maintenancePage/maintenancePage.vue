<template>
	<view class="content">
		<uni-section class="mb-10" titleFontSize="40rpx" title="当前域名" type="line">
			<view class="" style="padding:  30rpx;background: #55ffff;">
				{{value}}
			</view>
		</uni-section>
		<view class="" v-for="(item,index) in All" :key="index">
			<uni-section class="mb-10" titleFontSize="40rpx" :title="item.name" type="line">
				<view class="" style="display: flex;align-items: center;padding: 0 30rpx;">
					<uni-easyinput :disabled="item.state" placeholder="自定义域名" class="uni-mt-5" v-model="item.urlValue">
					</uni-easyinput>
					<view class="" style="width: 100rpx;margin-left: 10rpx;" @click="iconClick(item)">
						<u-button text="切换" type="success"></u-button>
					</view>
				</view>
			</uni-section>
		</view>
		<view class="u-page__button-item">
			<view class="" style="width: 330rpx;">
				<u-button text="重置" size="normal" @click="resetBut" type="primary"></u-button>
			</view>
			<view class="" style="width: 330rpx;">
				<u-button text="跳转到登录" size="normal" @click="ubut" type="primary"></u-button>
			</view>
		</view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
// import {
// 	getUrl
// } from '@/utils/util.js';
export default {
	data() {
		return {
			value: '',
			All: [],
			messageText: "fgjhdhuh",
			msgType: 'success',
		}
	},
	onLoad() {
		let then = this
		uni.getStorage({
			key: 'urlValueKey',
			success: function (res) {
				then.All = res.data
			},
			fail: function (err) {
				then.All = getApp().globalData.urlAll
			}
		});
		uni.getStorage({
			key: 'urlKey',
			success: function (res) {
				then.value = res.data
			},
			fail: function (err) {
				then.value = getApp().globalData.url
			}
		});
		// const url = 'https://cdbyg.cdmzj.vip/prod-api'; // 正式服

		// const url = 'http://124.70.186.201:44490'; //线上

		// const url = 'http://121.37.141.70:44454'; //演示服
	},
	methods: {
		iconClick(e) {
			if (e.urlValue) {
				this.value = e.urlValue
				getApp().globalData.url = this.value;
				uni.setStorage('storage_url', this.value);
				this.msgType = 'success'
				this.messageText = '已切换' + e.name + '域名'
				this.$refs.message.open()
			} else {
				this.msgType = 'error'
				this.messageText = '域名不能为空'
				this.$refs.message.open()
			}
		},
		resetBut() {
			this.All = getApp().globalData.urlAll = [{
				name: '正式服',
				urlValue: 'https://cdbyg.cdmzj.vip/prod-api',
				state: true
			},
			{
				name: '测试服',
				urlValue: 'http://124.70.186.201:9090',
				state: true
			},
			{
				name: '演示服',
				urlValue: 'http://124.70.186.201:44490',
				state: true
			},
			{
				name: '自定义域名',
				urlValue: '',
				state: false
			},
			]
			this.value = getApp().globalData.url = 'http://124.70.186.201:9090'
			uni.setStorage('urlValueKey', this.All);
			uni.setStorage('urlKey', this.value);
		},
		ubut() {
			uni.setStorage('urlValueKey', this.All);
			if (this.value) {
				uni.setStorage('urlKey', this.value);
			}
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	}
}
</script>

<style>
.content {
	background: #efeff4;
}


.u-page__button-item {
	position: fixed;
	width: 690rpx;
	height: 98rpx;
	bottom: 10rpx;
	margin: 0 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
