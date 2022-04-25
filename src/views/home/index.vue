<template>
  <div class="home_container">
    <!-- 顶部搜索栏 -->
    <van-nav-bar class="home_nav_bar" fixed>
      <van-button
        class="search_btn"
        type="info"
        size="small"
        round
        icon="search"
        slot="title"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 顶部搜索栏结束 -->

    <!-- 标签栏 -->
    <van-tabs
      class="channel_tab"
      v-model="active"
      animated
      swipeable
      color="#3296fa"
    >
      <van-tab v-for="item in channelInfo" :key="item.id" :title="item.name">
        <article-page :item="item" />
      </van-tab>

      <div class="placehoder" slot="nav-right"></div>
      <div class="liebiao" slot="nav-right" @click="modelShow = true">
        <i class="iconfont icon-liebiao"></i>
      </div>
    </van-tabs>
    <!-- 标签栏结束 -->

    <!-- 弹出层 -->
    <van-popup
        v-model="modelShow"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
    >
      <channel-edit/>
    </van-popup>
    <!-- 弹出层结束 -->
  </div>
</template>

<script>
import { getChannels } from "../../api/user";
import ArticlePage from "../home/components/article.vue";
import ChannelEdit from "../home/components/channels-edit.vue"
export default {
  name: "HomeContainer",
  components: { ArticlePage ,ChannelEdit },
  data() {
    return {
      active: 0,
      modelShow:true,
      channelInfo: [],
    };
  },
  created() {
    this.getChannelsInfo();
  },
  methods: {
    async getChannelsInfo() {
      try {
        const { data } = await getChannels();
        this.channelInfo = data.data.channels;
      } catch (error) {
        this.$toast.fail("获取失败，请稍后重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home_container {
  padding-bottom: 100px;
  padding-top: 92px;
}
.van-nav-bar {
  background: #3296fa;
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
.van-nav-bar .van-icon {
  color: white;
}
.home_nav_bar {
  .search_btn {
    width: 300px;
    background: #5ba5fb;
    border: none;
    font-size: 14px;
  }
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.channel_tab {
  /deep/ .van-tab {
    min-width: 101px;
    border-right: 1px solid #edeff3;
    color: rgb(189, 187, 187);
    font-size: 15px;
  }
  /deep/ .van-tabs__line {
    width: 20px;
  }
  /deep/ .van-tab--active {
    color: #333;
  }
}
.liebiao {
  position: fixed;
  right: 0;
  width: 48px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.8;
  .icon-liebiao {
    font-size: 20px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url("../../assets/gradient-gray-line.png");
    background-size: contain;
  }
}
.placehoder {
  width: 48px;
  height: 40px;
  flex-shrink: 0;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  z-index: 1;
  left: 0;
  right: 0;
}
</style>