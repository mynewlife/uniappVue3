<script>
// import socketIO from '@/utils/socketIO.js'
export default {
	onLaunch: function () {
		console.log('App Launch')
		// 初始化完成时触发（全局只触发一次）
		// 仅出现在 App 平台下的代码
		//#ifdef APP-PLUS
		uni.getSystemInfo({
			success: function (res) {
				this.deviceInformation = res
				if (res.platform == "android") {
					//客户端平台 值域为：ios、android、mac（3.1.10+）、windows（3.1.10+）、linux（3.1.10+）
					plus.screen.lockOrientation('portrait-primary')
				}
			}
		})
		//#endif

		// 监听键盘高度变化 ---处理h5在app输入使用 position: fixed;
		// uni.onKeyboardHeightChange(res => {
		// 	console.log(res.height,6666)
		// })
		//取消监听键盘高度变化事件
		// uni.offKeyboardHeightChange(res => {
		// 	console.log(res.height,6666)
		// })
	},
	onShow: function () {
		console.log('App Show')
		// this.globalData.connectSocket.connectSocketInit()

	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		// connectSocket: new socketIO(getConnect, 30000),
		// socketIOAll: [],
		storageToken: '',
		deviceInformation: {
			screenWidth: '', //屏幕宽度
			screenHeight: '', //屏幕高度
			statusBarHeight: '', //手机状态栏的高度
		}, //设备信息
		urlAll: [
			{ name: '正式服', urlValue: 'https://cdbyg.cdmzj.vip/prod-api', state: true },
			{ name: '测试服', urlValue: 'http://124.70.186.201:9090', state: true },
			{ name: '演示服', urlValue: 'http://124.70.186.201:44490', state: true },
			{ name: '自定义域名', urlValue: '', state: false },
		],
		url: 'http://124.70.186.201:9090'
	}
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";
@import "@/common/demo.scss";
@import '@/common/uni.css';
@import '@/common/uni-nvue.css';
</style>