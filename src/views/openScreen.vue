<template>
  <div class="update-photo">
    <img src="../assets/srceen.webp" class="img" />
    <div class="timer" @click="goHome()">{{ time }}s跳过广告</div>
  </div>
</template>

<script>
export default {
  name: "OpenScreen",
  data() {
    return {
      time: 5 ,
    };
  },
  created() {
    this.Timeout();
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    Timeout() {
      const timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
            this.$router.push('/home')
          clearInterval(timer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang='less' scoped>
.img {
  width: 100%;
  height: 100%;
  background-image: url("../assets/srceen.webp");
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex: 1;
}
.timer {
  width: 80px;
  height: 30px;
  border: 1px solid #fafda4;
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 40px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: white;
}
</style>