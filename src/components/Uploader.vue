<template>
  <div>
    <div class="trigger">
      <button @click="handleClick">
        <slot name="uploading" v-if="isFileUploading">
          <span>正在上传</span>
        </slot>
        <slot v-else-if="$slots.uploaded && lastUploadedFile && lastUploadedFile.status === UploaderStatus.success" name="uploaded" :data="lastUploadedFile.res" />
        <slot name="uploadBefore" v-else>
          <span>点击上传</span>
        </slot>
      </button>
      <input
        class="file-uploader"
        type="file"
        name="file"
        ref="fileInput"
        style="display:none"
        @change="handleFileChange"
        @error="handleInputError"
      />
    </div>
    <ul v-for="file in uploadedFiles" :key="file.id">
      <li class="file-item">
        <div class="file-item-info">
          <el-icon :size="20">
            <picture-filled />
          </el-icon>
          <span>{{file.name}}</span>
        </div>
        <el-icon :size="20" class="success">
          <check v-if="file.status === UploaderStatus.success" style="color: green;" />
        </el-icon>
        <el-icon class="remove" @click="handleRemove(file.id)">
          <close style="color:red;" />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue'
import axios from 'axios'
import { ElIcon } from 'element-plus'
import {  Loading, Check, Close, PictureFilled } from '@element-plus/icons'
import { v4 as uuid } from 'uuid'
import { last }  from 'lodash'

enum UploaderStatus {
  pending,
  uploading,
  success,
  fail
}

interface UploadedFile {
  id: string
  size: number,
  name: string
  file: File
  status: UploaderStatus
  res?: any
}

export default defineComponent({
  components: {
    ElIcon,
    Check,
    Close,
    PictureFilled,
  },
  name: 'Uploder',
  props: {
    uploadUrl: {
      type: String,
      require: true
    }
  },
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>()
    const uploadedFiles = ref<UploadedFile[]>([])
    const isFileUploading = computed(() => uploadedFiles.value.some(file => file.status === UploaderStatus.uploading))

    const lastUploadedFile = computed(() => last(uploadedFiles.value))

    const handleClick = () => {
      fileInput.value?.click()
    }

    let fileObj: UploadedFile
    const handleFileChange = async (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      const files = target.files || []
      const file = files[0]
      if (file) {
         const formData = new FormData()
        formData.append('avatar', file)
        try {
          if (props.uploadUrl) {
            fileObj = reactive({
              id: uuid(),
              size: file.size,
              name: file.name,
              file: file,
              status: UploaderStatus.uploading,
            })
            uploadedFiles.value.push(fileObj)
            const res = await axios.post(props.uploadUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            fileObj.status = UploaderStatus.success
            fileObj.res = res
          }
        } catch(e) {
          fileObj.status = UploaderStatus.fail
        } finally {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        }
      }
    }

    const handleInputError = (e: InputEvent) => {
      console.log(e)
    }

    const handleRemove = (id: string) => {
      const idx = uploadedFiles.value.findIndex(file => file.id === id)
      uploadedFiles.value.splice(idx, 1)
      // delete file by api
    }


    return {
      fileInput,
      handleClick,
      handleFileChange,
      handleInputError,
      UploaderStatus,
      status,
      isFileUploading,
      uploadedFiles,
      lastUploadedFile,
      handleRemove
    }
  },
})
</script>

<style lang="scss" scoped>
.trigger {
}
.file-item {
  display: flex;
  align-content: center;
  padding: 5px 20px 5px 0;
  justify-content: space-between;
  position: relative;
  &-info {
    display: flex;
    align-items: center;
  }
  .success, .remove {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .success {
    display: block;
  }
  .remove {
    display: none;
  }
  &:hover {
    background-color: #f0f0f0;
    .remove {
      display: block;
    }
    .success {
      display: none;
    }
  }
}
</style>
