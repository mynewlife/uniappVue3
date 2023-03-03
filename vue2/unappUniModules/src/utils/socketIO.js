import mcsy from "@/static/yinxiao.mp3";

class socketIO {
	constructor(url, time, data) {
		this.socketTask = null
		this.is_open_socket = false //避免重复连接
		this.url = url //连接地址
		this.data = data ? data : null
		this.connectNum = 1 // 重连次数
		this.traderDetailIndex = 100 // traderDetailIndex ==2 重连
		this.accountStateIndex = 100 // traderDetailIndex ==1 重连
		this.followFlake = false // traderDetailIndex == true 重连
		//心跳检测
		this.timeout = time ? time : 15000 //多少秒执行检测
		this.heartbeatInterval = null //检测服务器端是否还活着
		this.reconnectTimeOut = null //重连之后多久再次重连
	}
	// 进入这个页面的时候创建websocket连接【整个页面随时使用】
	connectSocketInit(data) {
		if (data) this.data = data;
		if (this.is_open_socket || !this.data) return;
		// this.data = data
		this.socketTask = uni.connectSocket({
			url: this.url + this.data,
			success: () => {
				console.log("正准备建立websocket中...");
			},
		});
		this.socketTask.onOpen((res) => {
			this.connectNum = 1
			console.log("WebSocket连接正常！");
			this.send(data)
			clearInterval(this.reconnectTimeOut)
			clearInterval(this.heartbeatInterval)
			this.is_open_socket = true;
			this.start();
			// 注：只有连接正常打开中 ，才能正常收到消息
			this.socketTask.onMessage((e) => {
				console.log(e.data,1111)
				let vall ='1'+e.data
				getApp().globalData.socketIOAll.push(vall)
				console.log(getApp().globalData.socketIOAll,1113333)
				console.log("res---------->", e.data) // 这里 查看 推送过来的消息		
				uni.createPushMessage({		
				content: e.data		
				})		
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = mcsy;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				uni.$emit('getPositonsOrder', e.data);
			});
		})
		// 监听连接失败，这里代码我注释掉的原因是因为如果服务器关闭后，和下面的onclose方法一起发起重连操作，这样会导致重复连接
		uni.onSocketError((res) => {
			console.log('WebSocket连接打开失败，请检查！');
			this.socketTask = null
			this.is_open_socket = false;
			clearInterval(this.heartbeatInterval)
			clearInterval(this.reconnectTimeOut)
			uni.$off('getPositonsOrder')
			if (this.connectNum < 6) {
				uni.showToast({
					title: `WebSocket连接失败，正尝试第${this.connectNum}次连接`,
					icon: "none"
				})
				this.reconnect();
				this.connectNum += 1
			} else {
				uni.$emit('connectError');
				this.connectNum = 1
			}


		});
		// 这里仅是事件监听【如果socket关闭了会执行】
		this.socketTask.onClose(() => {
			console.log("已经被关闭了-------")
			clearInterval(this.heartbeatInterval)
			clearInterval(this.reconnectTimeOut)
			this.is_open_socket = false;
			this.socketTask = null
			uni.$off('getPositonsOrder')
			if (this.connectNum < 6) {
				uni.showToast({
					title: `WebSocket连接失败，正尝试第${this.connectNum}次连接`,
					icon: "none"
				})
				this.reconnect();
			} else {
				uni.$emit('connectError');
				this.connectNum = 1
			}


		})

	}

	// 主动关闭socket连接

	Close() {
		if (!this.is_open_socket) {
			return
		}
		this.data = null;
		this.socketTask.close({
			success() {
				this.is_open_socket = false;
				console.log("退出登录");
				// uni.showToast({		
				// title: 'SocketTask 关闭成功',		
				// icon: "none"		
				// });
			}
		});

	}

	//发送消息

	send(data) {
		console.log("data---------->", data);
		// 注：只有连接正常打开中 ，才能正常成功发送消息
		if (this.socketTask) {
			this.socketTask.send({
				data: data,
				async success() {
					console.log("消息发送成功");
				},
			});
		}

	}

	//开启心跳检测

	start() {
		this.heartbeatInterval = setInterval(() => {
			this.send("心跳测试");
		}, this.timeout)
	}

	//重新连接

	reconnect() {
		//停止发送心跳
		clearInterval(this.heartbeatInterval)
		//如果不是人为关闭的话，进行重连
		if (!this.is_open_socket &&
			(this.traderDetailIndex == 2 ||
				this.accountStateIndex == 0 ||
				this.followFlake)
		) {
			this.reconnectTimeOut = setInterval(() => {
				this.connectSocketInit();
			}, 5000)
		}
	}
}

module.exports = socketIO
