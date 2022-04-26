<template>
  <div class="search_page">
    <form action="/" class="search_form">
      <van-search
        v-model="searchText"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @focus="isResultshow = false"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <search-result v-if="isResultshow" :search-text = "searchText"/>

    <search-suggestion 
      v-else-if="searchText" 
      :search-text = "searchText"
      @search="onSearch"
    />

    <search-history v-else 
      :searchHistorys = "searchHistory"
      @clear_search_Historys = "searchHistory = []"
      @search = "onSearch"
    />
    
    
  </div>
</template>

<script>
import searchHistory from './components/search_history.vue';
import searchSuggestion from './components/search_suggestion.vue';
import searchResult from './components/search_result.vue';
import { getItem, setItem } from '../../Utils/storage';
export default {
  name: "searchPage",
  components:{
      searchHistory,
      searchSuggestion,
      searchResult
  },
  data() {
    return {
      searchText: "",
      isResultshow:false,
      searchHistory:getItem('TOUTIAO_SEARCH_hISTORY') || [],
    };
  },
  watch:{
    searchHistory(value){
      setItem('TOUTIAO_SEARCH_hISTORY',value)
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      this.isResultshow = true
      const index = this.searchHistory.indexOf(val)
      if(index !== -1){
        this.searchHistory.splice(index,1)
      }else{
        this.searchHistory.unshift(val)
      }
    },
    onCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.van-search__action {
  color: white;
}
/deep/ .van-search{
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 1;
}
.search_form{
  margin-top: 50px;
}
</style>