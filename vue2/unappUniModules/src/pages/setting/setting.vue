
<template>
  <view>
    <view class="setting flex align_center justify_between padding_30 font_v30" v-if="getUserUserMeData.username">
      <text class="color_v7">账号</text>
      <text class="color_v0">{{ getUserUserMeData.username }}</text>
    </view>
    <view class="setting flex align_center justify_between padding_30 font_v30" v-if="getUserUserMeData.nickName">
      <text class="color_v7">昵称</text>
      <text class="color_v0">{{ getUserUserMeData.nickName }}</text>
    </view>
    <view class="setting flex align_center justify_between padding_30 font_v30" v-if="getUserUserMeData.phone">
      <text class="color_v7">电话</text>
      <text class="color_v0">{{ getUserUserMeData.phone }}</text>
    </view>
    <view style="width: 690rpx;height: 100rpx;"></view>
    <view class="uButton">
      <!--throttleTime 节流，一定时间内只能触发一次，单位毫秒 -->
      <u-button text="退出登录" size="normal" type="primary" @click="butClick" throttleTime="3000"></u-button>
    </view>
  </view>
</template>

<script>
// import footButtons from '../../components/footButtons/footButtons'; 
// import { url } from '@/config/config.js';
// import { userUserMe } from '@/api/apiApp.js';
import { signOutYes } from '@/utils/msg.js';
export default {
  components: {
    // footButtons,
  },
  data() {
    return {
      getUserUserMeData: {
        username: '',
        nickName: '',
        phone: '',
      },
      num: 1
    };
  },
  onLoad() {
    // 获取用户信息
    // userUserMe({})
    //   .then(response => {
    //     this.getUserUserMeData.username = response.username;
    //     this.getUserUserMeData.nickName = response.nickName;
    //     this.getUserUserMeData.phone = response.user.phone;
    //   })
    //   .catch((err) => {
    //     uni.showToast({
    //       title: err.msg,
    //       icon: 'none',
    //     });
    //   });
  },
  methods: {
    // 退出登录
    butClick() {
      this.num++
      console.log(this.num);
      // delete getApp().globalData.storageToken;
      // delete getApp().globalData.driverId;
      // uni.removeStorage({
      //   key: 'access_token',
      //   complete: function (res) {
      //     signOutYes();
      //     setTimeout(function () {
      //       uni.reLaunch({
      //         url: '/pages/login/login',
      //       });
      //     }, 1000);
      //   },
      // });
    },
  },
};
</script>

<style lang="scss">
.setting {
  border-bottom: 2rpx solid #b7b7b7;
  background: #ffffff;
  // margin: 0 24rpx;
}

.uButton {
  position: fixed;
  bottom: 10rpx;
  margin: 0 30rpx;
  width: 690rpx;
}
</style>
