<template>
  <van-icon
    :loading="loading"
    :class="{
      clloected: value,
    }"
    :name="value ? 'star' : 'star-o'"
    @click="onCollected"
  />
</template>

<script>
import { addCollected, deleteCollected } from "../../../api/article";
export default {
  name: "ArticleCollect",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollected() {
      this.loading = true;
      try {
        if (this.value) {
          await deleteCollected(this.articleId);
        }else{
            await addCollected(this.articleId)
        }
        this.$emit('input',!this.value)
        this.$toast.success(!this.value ? '收藏成功':'取消收藏')
      } catch (error) {
        this.$toast.fail("登录后可收藏");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang='less' scoped>
.clloected {
  color: #ffa500;
}
</style>