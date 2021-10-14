<template>
  <div class="image-wrapper">
    <div class="image-list">
      <img v-for="(img, index) in ImageTemplateConfig" :key="index" :src="img.imageSrc" alt="" @click="addImage(img)" />
    </div>
    <div class="uploader">
      <uploader upload-url="http://127.0.0.1:3000/api/upload" :showList="false" @addImage="addImage">
        <template #uploadBefore >
          <el-button>点击上传</el-button>
        </template>
      </uploader>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Uploader from '../Uploader.vue'
import { ImageTemplateConfig } from './template'

export default defineComponent({
  components: {
    Uploader
  },
  emits: ['on-template-click'],
  setup(props, context) {
    const addImage = (imageOptions: { [index: string]: any }) => {
      context.emit('on-template-click', {
        type: 'l-image',
        props: imageOptions
      })
    }
    return {
      addImage,
      ImageTemplateConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  img {
    margin-left: 20px;
    margin-bottom: 30px;
    width: 100px !important;
  }
}
.uploader {
  display: flex;
  justify-content: center;
}
</style>
