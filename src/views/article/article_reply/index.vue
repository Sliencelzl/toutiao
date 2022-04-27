<template>
  <div class="reply_container">
    <van-nav-bar class="top"
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
    <van-icon @click="$emit('close')" slot="left" name="cross"></van-icon>
    </van-nav-bar>

    <div class="scrooy">
        <comment-item :comment="comment" />
        <van-cell title="全部回复" />
        <comment-list :source="comment.com_id" type="c" />
    </div>
    

    <!-- <van-button style="width: 100%" class="comment-btn" round
      >写评论</van-button
    > -->
  </div>
</template>

<script>
import CommentItem from "../article_comment/components/comment_item.vue";
import CommentList from "../article_comment/index.vue";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 12px;
    }
  }
  .comment-content {
    font-size: 14px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 12px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 14px;
    line-height: 15px;
    margin-right: 7px;
    .van-icon {
      font-size: 16px;
    }
    &.liked {
      color: #e5645f;
    }
  }
.top{
    position: fixed;
}
}
</style>