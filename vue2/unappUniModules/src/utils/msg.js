const showMessage = (title, duration = 0, icon = null, image = null) => {
	let info = {
		title: title,
		icon: icon ? icon : "none",
		mask: true,
	}
	if (duration) {
		info['duration'] = duration;
	}
	if (image) {
		info['image'] = image;
	}
	uni.showToast(info)
}

//获取验证图片失败
const yzImageNo = () => {
	showMessage("验证码图片走走丢了", 2000)
}


//超时
const chaoshi = () => {
	showMessage("网速像蜗牛一样，请稍后再试！", 2000)
}

//登录失败
const loginNo = (msg) => {
	showMessage(msg, 0)
}

//登录成功
const loginSuc = () => {
	showMessage("登录成功", 2000, "success")
}

//退出成功
const signOutYes = () => {
	showMessage("已退出", 2000, "success")
}

module.exports = {
	showMessage,
	yzImageNo,
	chaoshi,
	loginNo,
	loginSuc,
	signOutYes
}
