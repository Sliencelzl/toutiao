<template>
  <div class="update_sex">
    <van-picker
      show-toolbar
      :default-index="value"
      :columns="columns"
      @cancel="$emit('colse')"
      @confirm="onConfirm"
      @change="onPickChange"
    />
  </div>
</template>

<script>
import { updateUserprofile } from "../../../api/user";
export default {
  name: "UpdateSex",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        const localGender = this.localGender;
        await updateUserprofile({
          gender: localGender,
        });
        this.$emit("input", localGender);
        this.$emit("colse");
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },
    onPickChange(index) {
      this.localGender = index;
    },
  },
};
</script>

<style>
</style>