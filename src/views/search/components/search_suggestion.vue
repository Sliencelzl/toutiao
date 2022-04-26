<template>
  <div class="search_suggestion">
    <van-cell  
        icon="search"
        v-for="(text,index) in suggesstions"
        :key="index"
        @click="$emit('search',text)"
    >
    <div slot="title" v-html="light(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '../../../api/search'
import { debounce } from 'lodash'
export default {
  name: "searchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data(){
      return{
          suggesstions:[]
      }
  },
  methods:{
    async  LoadsearchSugges(q){
        try {
            const { data } = await getSearchSuggestions(q)
            this.suggesstions = data.data.options
        } catch (error) {
           this.$toast.fail('未查询到结果')
        }
    },
    /* 高亮 */
    light(text){
        const reg = new RegExp(this.searchText,'gi')
        const hightlighttext = `<span class="active">${this.searchText}</span>`
        return text.replace(reg,hightlighttext)
    } 
  },
  watch: {
    searchText: {
      /* handler(value) {
        this.LoadsearchSugges(value)
      }, */
      handler:debounce(function(value){
        this.LoadsearchSugges(value)
      },500),
      /* handler:function(value){

      }, */
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
 .search_suggestion{
    /deep/ span.active{
        color: #3296fa ;
    }
}
</style>