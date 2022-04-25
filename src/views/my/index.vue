<template>
  <div class="my_container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avator"
            round
            :src="userInfo.photo"
            fit="cover"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <div v-else class="header Not_login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile_img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <van-grid class="grid-nav" :column-num="2">
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="grid-txt">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="grid-txt">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link class="msg" />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      title="退出登录"
      class="loginOut"
      clickable
      @click="onLoginout()"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from '../../api/user'
export default {
  name: "MyContainer",
  data() {
    return {
      userInfo:{}
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created(){
    if(this.user){
      this.onLoadInfo()
    }
  },
  onMounted(){
      
  },
  methods: {
    onLoginout() {
      this.$dialog.confirm({
        title: "确认退出吗？",
      })
        .then(() => {
          this.$store.commit('setUser',null)
        })
        .catch(() => {
        });
    },
    async onLoadInfo(){
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log('获取用户信息=>',this.userInfo)
      } catch (error) {
        this.$toast.fail('获取数据失败，请稍后重试')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.my_container {
  .header {
    height: 240px;
    background-image: url("../../assets/banner.png");
    background-size: cover;
  }
  .Not_login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .mobile_img {
        width: 100px;
        height: 100px;
        margin-bottom: 30px;
      }
      .text {
        font-size: 20px;
        color: white;
      }
    }
  }
  .user-info {
    .base-info {
      height: 150px;
      padding: 20px 15px 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avator {
          width: 80px;
          height: 80px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 20px;
          color: white;
          margin-left: 15px;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 80px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        .count {
          font-size: 20px;
        }
        .text {
          font-size: 16px;
        }
      }
    }
  }
}
.grid-nav {
  .grid-item {
    height: 100px;
    i.iconfont {
      font-size: 20px;
      margin-top: 5px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    .grid-txt {
      font-size: 20px;
    }
  }
}
.loginOut {
  text-align: center;
  color: #d86262;
  margin-top: 10px;
}
.msg {
  margin-top: 10px;
}
</style>