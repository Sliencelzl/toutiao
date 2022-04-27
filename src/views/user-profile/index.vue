<template>
  <div class="user-info">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <input type="file" hidden ref="file" @change="onFileChange" />

    <van-cell
      title="头像"
      class="photo-cell"
      is-link
      @click="$refs.file.click()"
    >
      <van-image class="avator" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateNameshow = true"
      title="昵称"
      :value="user.name"
      is-link
    />
    <van-cell
      @click="isUpdateGendershow = true"
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      @click="isUpdateBirthdayshow = true"
      title="生日"
      :value="user.birthday"
      is-link
    />

    <van-popup
      v-model="isUpdateNameshow"
      style="height: 100%"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameshow"
        @colse="isUpdateNameshow = false"
        v-model="user.name"
      />
    </van-popup>

    <van-popup
      v-model="isUpdateGendershow"
      style="height: 42%"
      position="bottom"
    >
      <update-sex
        v-if="isUpdateGendershow"
        @colse="isUpdateGendershow = false"
        v-model="user.gender"
      />
    </van-popup>

    <van-popup
      v-model="isUpdateBirthdayshow"
      style="height: 42%"
      position="bottom"
    >
      <update-birthday
        v-if="isUpdateBirthdayshow"
        @colse="isUpdateBirthdayshow = false"
        v-model="user.birthday"
      />
    </van-popup>

    <van-popup
      v-model="isUpdatePhotoshow"
      style="height: 100%"
      position="bottom"
    >
      <update-photo
        :img="img"
        v-if="isUpdatePhotoshow"
        @colse="isUpdatePhotoshow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoprofile } from "../../api/user";
import UpdateName from "./component/updateName.vue";
import UpdateSex from "./component/updateSex.vue";
import UpdateBirthday from "./component/updateBirthday.vue";
import UpdatePhoto from "./component/updatePhoto.vue";
export default {
  name: "UserInfo",
  components: { UpdateName, UpdateSex, UpdateBirthday, UpdatePhoto },
  data() {
    return {
      user: {},
      isUpdateNameshow: false,
      isUpdateGendershow: false,
      isUpdateBirthdayshow: false,
      isUpdatePhotoshow: false,
      img: null,
    };
  },
  created() {
    this.getuserInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async getuserInfo() {
      try {
        const { data } = await getUserInfoprofile();
        this.user = data.data;
      } catch (error) {
        this.$toast.fail("用户信息获取失败");
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0];
      this.img = window.URL.createObjectURL(file);
      this.isUpdatePhotoshow = true;
      this.$refs.file.value = "";
    },
  },
};
</script>

<style lang='less' scoped>
.van-nav-bar {
  background: #3296fa;
  /deep/ .van-nav-bar__title {
    color: white;
  }
  /deep/ .van-icon {
    color: white;
  }
  /deep/ .van-nav-bar__text {
    color: white;
  }
}

.avator {
  width: 30px;
  height: 30px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>