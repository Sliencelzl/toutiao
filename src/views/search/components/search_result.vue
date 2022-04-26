<template>
  <div class="search_result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '../../../api/search'
export default {
  name: "searchResult",
  props:{
    searchText:{
      type:String,
      reqired:true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:10
    };
  },
  methods: {
  async onLoad() {
        try {
          const { data } = await getResult({
            page:this.page,
            per_page:this.per_page,
            q:this.searchText
          })
          console.log(data)
          const { results } = data.data

          this.list.push(...results)
          this.loading = false
          if(results.length){
            this.page++
          }else{
            this.finished = true
          }
        } catch (error) {
          this.loading = false
          this.$toast.fail('获取失败')
        }
    },
  },
};
</script>

<style>
</style>