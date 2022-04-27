<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        @click="onCommentlike"
        class="like-btn"
        :class="{
          liked: comment.is_liking
        }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
      >{{ comment.like_count > 0 ?  comment.like_count : '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click',comment)"
        >回复 {{ comment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike , deleteCommentLike } from '../../../../api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async onCommentlike(){
          this.commentLoading = true
          try {
              if(this.comment.is_liking){
                await  deleteCommentLike(this.comment.com_id)
                this.comment.like_count--
              }else{
                await addCommentLike(this.comment.com_id)
                this.comment.like_count++
              }
              this.comment.is_liking = !this.comment.is_liking
          } catch (error) {
              this.$toast.fail('操作失败')
          }
          this.commentLoading = false
      },

  }
}
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
}
</style>