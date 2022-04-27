<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message.length"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '../../api/comment'
export default {
  name: 'CommentPost',
  components: {},
 /*  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  }, */
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
        this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认 2000，0 表示持续展示不关闭
      });
     try {
         const { data } = await addComment({
             target:this.target,
             content:this.message,
             art_id:null
         })
         console.log(data)
         this.message = ''
         this.$emit('post-success',data.data)
         this.$toast.success('发布成功')
     } catch (error) {
         this.$toast.fail('发布失败')
     }
      
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 15px 0 15px 15px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
