<template>
  <div class="channel_edit">
    <van-cell :border="false">
      <div slot="title" class="TV">我的频道</div>
      <van-button
        type="danger"
        class="edit_btn"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid_item mygrid"
        @click="onMychannelClick(channel, index)"
        v-for="(channel, index) in mychannel"
        :key="index"
      >
        <van-icon
          v-show="isEdit && !fixedChannel.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="TV">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid_item"
        v-for="(channel, index) in recommendChannels"
        icon="plus"
        :key="index"
        :text="channel.name"
        @click="onClickchannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllchannels,
  addUserchannels,
  deleteUserChannel,
} from "../../../api/channels";
import { mapState } from "vuex";
import { setItem } from "../../../Utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    mychannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allchannels: [],
      isEdit: false,
      fixedChannel: [0, 11, 17],
    };
  },
  computed: {
    ...mapState(["user"]),
    /* 我的频道中没有的 */
    recommendChannels() {
      const channels = [];
      this.allchannels.forEach((channel) => {
        const ret = this.mychannel.find((mychannel) => {
          return mychannel.id === channel.id;
        });
        if (!ret) {
          channels.push(channel);
        }
      });
      return channels;
    },
  },
  created() {
    this.loadAllchannels();
  },
  methods: {
    async loadAllchannels() {
      try {
        const { data } = await getAllchannels();
        this.allchannels = data.data.channels;
      } catch (error) {
        this.$toast.fail("获取频道失败");
      }
    },
    onMychannelClick(channel, index) {
      console.log(channel, index);
      if (this.isEdit) {
        if (this.fixedChannel.includes(channel.id)) {
          return;
        }
        if (index <= this.active) {
          this.$emit("Update_active", this.active - 1, true);
        }
        this.deleteUserChannel(channel); //删除频道列表数据的方法
        this.mychannel.splice(index, 1);
      } else {
        this.$emit("Update_active", index, false);
      }
    },
    async onClickchannel(channel) {
      this.mychannel.push(channel);
      if (this.user) {
        try {
          const { data } = await addUserchannels();
          console.log(data);
        } catch (error) {
          this.$toast.fail("保存失败，稍后重试");
        }
      } else {
        setItem("TOUTIAO_ADDCHANNEL", this.mychannel);
      }
    },
    async deleteUserChannel(channel) {
      try {
        if (this.user) {
            await deleteUserChannel(channel.id);
        } else {
          setItem("TOUTIAO_ADDCHANNEL", this.mychannel);
        }
      } catch (error) {
          this.$toast.fail('删除失败')
          console.log(error)
      }
    },
  },
};
</script>

<style lang='less' scoped>
.channel_edit {
  padding: 45px 0;
  .TV {
    line-height: 34px;
    font-size: 16px;
  }
  .edit_btn {
    width: 60px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid_item {
    width: 100px;
    height: 40px;
    /deep/ .van-grid-item__text {
      font-size: 14px;
      margin-top: 1px;
      white-space: nowrap;
    }
    /deep/ .van-grid-item__content {
      background: #f4f5f6;
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      white-space: nowrap;
      flex-direction: row;
      margin-top: 10px;
      .van-icon {
        font-size: 14px;
        margin-left: 3px;
      }
    }
  }
  /deep/ .mygrid {
    .van-icon-clear {
      position: absolute;
      right: -3px;
      top: -6px;
      font-size: 16px;
      color: #cacaca;
      z-index: 2;
    }
  }
  .text {
    font-size: 14px;
  }
  .active {
    color: red;
  }
  /deep/ .van-grid-item__icon-wrapper {
    position: unset;
  }
}
/deep/ .grid_item {
  margin-top: 10px;
}
</style>