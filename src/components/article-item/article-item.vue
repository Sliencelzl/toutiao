<template>
   <van-cell
    class="article-item"
    :to="'/article/'+ item.art_id"
  >
    <div slot="title" class="title">{{ item.title }}</div>
    <div slot="label">
      <div v-if="item.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in item.cover.images"
          :key="index"
        >
          <van-image
            width="100"
            height="100"
            :src="img"
          />
        </div>
      </div>
      <div class="text-item">
        <span>{{ item.aut_name }}</span>
        &nbsp;
        <span>{{ item.comm_count }}评论</span>
        &nbsp;
        <span>{{ item.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="item.cover.type === 1"
      slot="default"
      width="100"
      height="80"
      :src="item.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
    name:'articleitem',
    props:{
        item:{
            type:Object,
            required:true
        }
    },
    data(){
        return{}
    }
}
</script>

<style lang='less' scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 80px;
    height: 80px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 200px;
  }

  .label-info-wrap span {
    font-size: 12px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 60px 0;
    .cover-item {
      flex: 1;
      height: 40px;
      margin-top: -40px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 40px;
      }
    }
  }
}
.text-item{
    margin-top: 5px;
}
</style>