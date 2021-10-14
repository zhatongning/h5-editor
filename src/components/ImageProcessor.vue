<template>
  <div>
    <l-image :imageSrc="url" width="100px" height="100px" />
    <uploader upload-url="http://127.0.0.1:3000/api/upload" @addImage="changeImage" :showList="false"/>
    <el-dialog v-model="showModal" title="裁剪图片" width="60%" center>
      <div>
        <img class="img" id="image" :src="url" alt="" ref="imageRef">
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showModal = false">Cancel</el-button>
          <el-button type="primary" @click="handleOK"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-button @click="openModal">裁剪</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import Uploader from './Uploader.vue'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs'
import { upload } from '../utils/upload'
import { v4 as uuid } from 'uuid'

export default defineComponent({
  components: {
    Uploader
  },
  props: {
    url: String,
  },
  emits: ['on-change'],
  setup(props, context) {
    const showModal = ref<boolean>(false)
    const imageRef = ref<null | HTMLImageElement>(null)

    const changeImage = (option: { imageSrc: string, width: string, height: string }) => {
      context.emit('on-change', option.imageSrc)
    }

    let cropper: Cropper | null = null
    watch(showModal, async (newValue) => {
      if (newValue) {
        await nextTick()
        console.log(imageRef)
        if (imageRef.value) {
          cropper = new Cropper(imageRef.value, {
            aspectRatio: 16 / 9,
            viewMode: 1,
            crop(event) {
              console.log(event)
            }
          })
        }
      } else {
        if (cropper) {
          cropper.destroy()
        }
      }
    })

    const openModal = () => {
      showModal.value = true
    }

    const handleOK = () => {
      showModal.value = false
      if (cropper) {
        cropper.getCroppedCanvas().toBlob((blob) => {
          if (blob) {
            upload('http://127.0.0.1:3000/api/upload', blob, `cropper-img-${uuid().slice(0,4)}`).then((url) => {
              context.emit('on-change', url)
            })
          }
        })
      }
    }

    return {
      changeImage,
      showModal,
      openModal,
      imageRef,
      handleOK
    }
  },
})
</script>

<style lang="scss" scoped>
.img {
  display: block;
  max-width: 100%;
}
</style>