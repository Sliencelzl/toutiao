<template>
  <div class="update_brithday">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        @cancel="$emit('colse')"
        :max-date="maxDate"
        @confirm="onConfirm"
    />
  </div>

</template>

<script>
import { updateUserprofile } from '../../../api/user'
import  dayjs from 'dayjs'
export default {
    name:'UpdateBirthday',
    props:{
        value: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(this.value)
        }
    },
    methods:{
        async onConfirm () {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, // 禁止背景点击
                duration: 0 // 持续展示
            })

      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')

        await updateUserprofile({
          birthday: currentDate
        })

        // 更新视图
        this.$emit('input', currentDate)

        // 关闭弹层
        this.$emit('colse')

        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
    }
}
</script>

<style>

</style>