<template>
  <div class="channel_edit">
    <van-cell :border="false">
      <div slot="title" class="TV">我的频道</div>
      <van-button type="danger" class="edit_btn" plain round size="mini">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid_item mygrid" icon="clear" v-for="value in 8" :key="value" text="文字" />
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="TV">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid_item" v-for="value in 8" icon="plus" :key="value" text="文字" />
    </van-grid>

  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
};
</script>

<style lang='less' scoped>
.channel_edit {
  padding: 45px 0;
  .TV {
    line-height: 34px;
    font-size: 16px;
  }
  .edit_btn{
    width: 60px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid_item{
    width: 100px;
    height: 40px;
    /deep/ .van-grid-item__content{
        background: #f4f5f6;
    }
  }
 /deep/ .recommend-grid{
    .van-grid-item__content{
        white-space: nowrap;
        flex-direction: row;
        .van-icon{
            font-size: 14px;
            margin-left: 3px;
        }
        .van-grid-item__text{
            margin-top: 1px;
        }
    }
  }
  /deep/ .mygrid{
    .van-icon-clear{
        position: absolute;
    right: -3px;
    top: -6px;
    font-size: 16px;
    color: #cacaca;
    z-index: 2;
  }
}
  
    

}
</style>