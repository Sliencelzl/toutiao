<template>
  <div class="article-page">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="successRefershText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <article-item 
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "../../../api/article";
import ArticleItem from "../../../components/article-item/article-item.vue";
export default {
  name: "articlePage",
  components:{ ArticleItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],//获取的文章数据
      loading: false,//van-list的加载中动画的状态
      isreFreshLoading: false,//van-pull-refresh下拉刷新的状态
      finished: false,//van-list完成后的状态
      timestamp: null,//请求数据时需要的参数
      error: false,//van-list的错误提示
      successRefershText: "刷新成功",//下拉刷新的文字提示
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.item.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.item.id,
          timestamp: Date.now(),
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.isreFreshLoading = false;
        this.successRefershText = `刷新成功，更新了${results.length}条数据`;
      } catch (error) {
        this.isreFreshLoading = false;
        this.successRefershText = "刷新失败";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.article-page{
    height: 200vh;
    overflow-y: auto;
}
</style>