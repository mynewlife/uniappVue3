<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="view1">
      22
      <view class="view2">{{ computedClassStr }}</view>
    </view>
    <view>-------------------------------------------</view>
    <view v-for="(item, index) in items">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </view>
    <view>-------------------------------------------</view>
    <view v-for="(value, name, index) in object">
      {{ index }}. {{ name }}: {{ value }}
    </view>
    <view>-------------------------------------------</view>
    <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="(item, index) in items" :key="item.name">
        <radio :value="item.name" :checked="item.checked" /> {{ item.value }}
      </label>
    </radio-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      parentMessage: 'Parent',
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2021-05-10'
      },
      items: [{
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      }
      ]
    }
  },
  onLoad() { },
  methods: {},
  computed: {
    computedClassStr() {
      return this.title
    }
  }
}
</script>

<style lang="scss">
.view1 {
  font-size: 30rpx;

  .view2 {
    font-size: 40rpx;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
