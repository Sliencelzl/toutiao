<template>
  <div class="search_history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear_search_Historys')">全部删除</span>
        /
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <van-icon name="delete" @click="isDeleteShow = true" v-else></van-icon>
    </van-cell>

    <van-cell v-for="(item,index) in searchHistorys" :key="index" :title="item" @click="onSearchItemClick(item,index)">
      <van-icon name="close"  v-show="isDeleteShow"></van-icon>
    </van-cell>

  </div>
</template>

<script>
export default {
    name:'searchHistory',
    props:{
      searchHistorys:{
        type:Array,
        required:true
      }
    },
    data(){
      return{
        isDeleteShow:false
      }
    },
    methods:{
      onSearchItemClick(item,index){
        if(this.isDeleteShow){
          this.searchHistorys.splice(index,1)
        }else{
          this.$emit('search',item)
        }
      }
    }
}
</script>

<style>

</style>