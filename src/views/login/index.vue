<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-form ref="loginForms" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="手机号"
        :rules="userFromRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="验证码"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountdowShwo"
            :time="1000 * 60"
            format="验证码发送中 ss s"
            @finish="isCountdowShwo = false"
          />
          <van-button
            v-else
            @click="sendSmsBtn()"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "../../api/user";
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "246810",
      },
      userFromRules: {
        mobile: [
          {
            required: true,
            message: "用户手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "用户手机号错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountdowShwo: false,
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认 2000，0 表示持续展示不关闭
      });
      try {
        const { data } = await login(user);
        this.$store.commit('setUser',data.data)
        this.$toast.success("登录成功");
        this.$router.go(-1)
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          this.$toast.fail("未知错误！");
        }
      }
    },
    //获取验证码
    async sendSmsBtn() {
      try {
        await this.$refs.loginForms.validate("mobile");
      } catch (error) {
        return console.log("验证失败", error);
      }
      this.isCountdowShwo = true;

      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
        this.isCountdowShwo = false
      } catch (error) {
          if(error.response.status === 429){
              this.$toast.fail('获取验证码太频繁，1分钟后重试')
          }else{
              this.$toast.fail('获取验证码太频繁，1分钟后重试')
          }
      }
    },
    onClickLeft(){
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: #3296fa;
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
.send-sms-btn {
  background-color: #ededed;
  width: 86px;
  height: 25px;
  line-height: 25px;
}
.van-button--info {
  background-color: #6db4fb;
  border: none;
}
.icon-yanzhengma {
  position: relative;
  top: 3px;
}
.van-count-down{
    width: 110px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: #ededed;
    border-radius: 999px;
    font-size: 12px;
}
/deep/ .van-icon { 
   color: white;
}
/deep/ .van-nav-bar__text{
  color: white;
}
</style>

