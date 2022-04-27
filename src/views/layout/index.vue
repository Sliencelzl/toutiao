<template>
  <div class="layout_container">
    <router-view />


    <van-tabbar route >
      <van-tabbar-item  to='/home'>
        <i slot="icon" class="iconfont icon-31shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <!-- <van-tabbar-item  to="/quan">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item> -->
      <van-tabbar-item  to="/my">
        <i slot="icon" class="iconfont icon-wodewo"></i>
        <span class="text">{{ $store.state.user ? '我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: "layoutIndex",
  data() {
    return {
       active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 20px;
}
</style>