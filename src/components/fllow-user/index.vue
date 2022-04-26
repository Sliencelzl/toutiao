<template>
  <van-button
    v-if="isFollowded"
    class="follow-btn"
    type="info"
    color="#3296fa"
    :loading="loading"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    :loading="loading"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { deleteUser, addUser } from "../../api/user";
export default {
  name: "fllowUser",
  props: {
    isFollowded: {
      type: Boolean,
      required: true,
    },
    userId:{
        type:[Number,String,Object],
        required:true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onFollow() {
      this.loading = true;
      try {
        if (this.isFollowded) {
          await deleteUser(this.userid);
        } else {
          await addUser(this.userid);
        }
        this.$emit('update-is_followed',!this.isFollowded)
      } catch (error) {
        let message = "未登录，登录后关注";
        if (error.response && error.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast.fail(message);
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>