<template>
  <van-icon
    :loading="loading"
    :class="{
      liked: value === 1
    }"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLiked"
  />
</template>

<script>
import { addlikings, deletelikings } from "../../../api/article";
export default {
  name: "ArticleLike",
  props: {
    value: {
      type: Number,
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
    async onLiked() {
      this.loading = true;
      try {
          let status = -1
        if (this.value === 1) {
          await deletelikings(this.articleId);
        }else{
            await addlikings(this.articleId)
            status = 1
        }
        this.$emit('input',status)
        this.$toast.success(status === 1 ? '点赞成功':'取消点赞')
      } catch (error) {
        this.$toast.fail("登录后可点赞文章");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang='less' scoped>
.liked {
  color: #ffa500;
}
</style>