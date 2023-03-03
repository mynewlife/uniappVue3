<template>
	<view class="content">
		<view class="box-bg">
			<view class="box-bg">
				<view class="box-bg">
					<uni-nav-bar rightText="设置" title="标题" @clickRight="settingRight" />
				</view>
			</view>
		</view>
		<view class="u-page">
			<u-toast ref="uToast"></u-toast>
			<u-cell-group title-bg-color="rgb(243, 244, 246)">
				<u-cell :titleStyle="{fontWeight: 500}" :title="item.title" v-for="(item, index) in list" :key="index"
					isLink :icon="item.iconUrl" @click="showToast(item)">
				</u-cell>
			</u-cell-group>
		</view>
		<!-- <uni-num></uni-num> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			list: [{
				type: 'default',
				title: '默认主题',
				message: "锦瑟无端五十弦",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
			},
			{
				type: 'error',
				icon: false,
				title: '失败主题',
				message: "一弦一柱思华年",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
			},
			{
				type: 'success',
				title: '成功主题(带图标)',
				message: "庄生晓梦迷蝴蝶",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
			},
			{
				type: 'warning',
				position: "top",
				title: '位置偏移上方',
				message: "望帝春心托杜鹃",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/top.png'
			},
			{
				type: 'loading',
				title: '正在加载',
				message: "正在加载",
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/loading.png'
			},
			{
				type: 'default',
				title: '结束后跳转标签页',
				message: "此情可待成追忆",
				url: '/pages/componentsB/tag/tag',
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/jump.png'
			}
			],
		}
	},

	onLoad() {

	},
	methods: {
		settingRight() {
			uni.navigateTo({
				url: '/pages/setting/setting'
			});
		},
		button() {
			console.log(6666);
		},
		showToast(params) {
			this.$refs.uToast.show({
				...params,
				complete() {
					params.url && uni.navigateTo({
						url: params.url
					})
				}
			})
		}
	}
}
</script>

<style lang="scss">
page {
	background: #f0eff4;
}

.urlAllClass {
	margin: 20rpx 0;
}
</style>
