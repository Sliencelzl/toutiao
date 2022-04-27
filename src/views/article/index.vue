<template>
  <div class="article-container">
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="沉默头条"
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="main-wrap">
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <div class="article-detail" v-else-if="article.title">
        <div class="article-title">{{ article.title }}</div>
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <fllow-user
            :is-followded="article.is_followed"
            class="follow-btn"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          />
        </van-cell>

        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <comment-list :source="article.art_id" @onload-sucess="totalComment = $event.total_count" :list="commentlist" @reply-click="onReplyclick"/>

        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isPostshow = true"
            >写评论</van-button
          >
          <van-popup v-model="isPostshow" position="bottom" >
            <comment-post :target="article.art_id" @post-success="onPostsuccess"/>
          </van-popup>

          <van-icon name="comment-o" :badge="totalComment" color="#777" />

          <article-collect v-model="article.is_collected" :article-id = "article.art_id"/>

          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <article-like v-model="article.attitude" :article-id = "article.art_id"/>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
      </div>

      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticle()" class="retry-btn"
          >点击重试</van-button
        >
      </div>
    </div>

    <van-popup  v-model="isReplayshow" position="bottom" :style="{ height: '100%' }" >
      <comment-reply v-if="isReplayshow" :comment="currentComment" @close="isReplayshow = false"/>
    </van-popup>
  </div>
</template>

<script>
import { getArticlesDetails } from "../../api/article";
import FllowUser from "../../components/fllow-user/index.vue";
import { ImagePreview } from "vant";
/* import { mapState } from "vuex"; */
import ArticleCollect from "../article/article_collect/index.vue";
import ArticleLike from "../article/article_like/index.vue";
import CommentList from "../article/article_comment/index.vue";
import CommentPost from "../../components/comment-post.vue/index.vue";
import CommentReply from "../../views/article/article_reply/index.vue"
export default {
  name: "ArticlePage",
  components: { FllowUser, ArticleCollect ,ArticleLike,CommentList,CommentPost,CommentReply},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: true, //加载中的loading状态
      errStatus: 0,
      Fllowloading: false,
      totalComment:0,
      isPostshow:false,
      isReplayshow:false,
      commentlist:[],
      currentComment:{}
    };
  },
  computed: {
    /* ...mapState(["user"]), */
  },
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      try {
        const { data } = await getArticlesDetails(this.articleId);
        this.article = data.data;
        console.log(this.article);
        /* this.$refs.article-content */
        setTimeout(() => {
          this.ImagePreviews();
        }, 0);
        this.loading = false;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404;
        }
        this.loading = false;
        this.$toast.fail("获取失败", error);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    ImagePreviews() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    onPostsuccess(data){
      this.isPostshow = false
      this.commentlist.unshift(data.new_obj)
    },
    onReplyclick(comment){
      this.currentComment = comment
      this.isReplayshow = true
    }
  },
};
</script>

<style lang="less" scoped>
@import "./github-markdown.css";
.article-container {
  .van-nav-bar {
    background: #3296fa;
    /deep/ .van-nav-bar__title {
      color: white;
    }
    /deep/ .van-icon {
      color: white;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 40px;
    overflow-y: scroll;
    background-color: #fff;
    .loading-wrap {
      padding: 40px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
    .article-detail {
      .article-title {
        font-size: 16px;
        padding: 8px 10px;
        margin: 0;
        color: #3a3a3a;
      }
      .user-info {
        padding: 4px 10px;
        .avatar {
          width: 50px;
          height: 50px;
        }
        .user-name {
          font-size: 12px;
          margin-left: 5px;
        }
        .publish-date {
          margin-left: 5px;
        }
        .follow-btn {
          width: 80px;
          height: 30px;
        }
      }
    }
    .article-content {
      padding: 5px 3px;
      /deep/ p {
        text-align: justify;
      }
    }
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .text {
        font-size: 12px;
        color: #666666;
        margin: 5px 0 14px;
      }
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 40px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 120px;
      height: 30px;
      border: 2px solid #eeeeee;
      font-size: 12px;
      line-height: 40px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 10px;
        background-color: #e22829;
      }
    }
  }
}
</style>