<template>
  <div class="update_name">
      <van-nav-bar
      title="设置昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('colse')"
      @click-right="onUpdate"
    />

    <div class="filed">
        <van-field
        v-model.trim="Localname"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
    />
    </div>
    
  </div>
</template>

<script>
import { updateUserprofile } from '../../../api/user' 
export default {
    name:'UpdateName',
    props:{
        value:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            Localname:this.value
        }
    },
    methods:{
        async onUpdate(){
            this.$toast.loading({
                message: '保存中...',
            forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
           try {
               const localname = this.Localname
               if(!localname.length){
                   this.$toast.fail('呢称不能为空')
                   return
               }
                await updateUserprofile({
                    name:localname
                })
                this.$emit('input',localname)
                this.$emit('colse')
                this.$toast.success('更新成功')
           } catch (error) {
               this.$toast.fail('修改失败')
           }
        }
    }
}
</script>

<style lang='less' scoped>
.filed{
    padding: 10px;
}
</style>