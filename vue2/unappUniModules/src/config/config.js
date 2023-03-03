//除了 H5 平台，其它平台均存在的代码
// #ifndef H5
// const url = "http://121.37.141.70:44454";
// #endif

//在 H5 平台或微信小程序平台存在的代码
// #ifdef H5
const url = "/myApi";
//#endif

// 仅出现在 App 平台下的代码
// #ifdef APP-PLUS

// #endif

module.exports = {
	url,
}
