<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="加载失败！点击重试"
    @load="onLoad"
    :immediate-check="false"

  >
    <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
    <comment-item v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click',$event)"/>
  </van-list>
</template>

<script>
import { getComment } from '../../../api/comment'
import CommentItem from './components/comment_item.vue'

export default {
  name: "CommentList",
  components:{ CommentItem },
  props:{
      source:{
          type:[Number,String,Object],
          required:true
      },
      list:{
        type:Array,
        default:() => []
      },
      type:{
        type:String,
        validator(value){
          return ['a','c'].includes(value)
        },
        default:'a'
      }
  },
  data() {
    return {
      //list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:10,
      error:false
    };
  },
  created(){
    this.loading = true
      this.onLoad()
  },
  methods: {
    async onLoad() {
        try {
            const { data } = await getComment({
                type:this.type,
                source:this.source,
                offset:this.offset,
                limit:this.limit
            })
            const { results } = data.data
            this.list.push(...results)
            this.$emit('onload-sucess',data.data)
            this.loading = false
            if(results.length){
                this.offset = data.data.last_id
            }else{
                this.finished = true
            }
        } catch (error) {
            this.error = true
            this.loading = false
        }
    },
  },
};
</script>

<style lang="less" scoped>
</style>