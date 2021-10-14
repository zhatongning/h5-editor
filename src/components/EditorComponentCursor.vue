<template>
  <div class="component-cursor" :style="wrapperRect">
    <el-icon :size="20" v-show="currentComponentId" class="remove" @click="handleRemove">
      <delete  />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store/types'
import { ElIcon } from 'element-plus'
import {  Delete } from '@element-plus/icons'

export default defineComponent({
  components: {
    ElIcon,
    [Delete.name]: Delete
  },
  props: {
    padding: {
      type: Number,
      default: 5
    }
  },
  setup() {
    const store = useStore<GlobalStore>()

    const wrapperRect = computed(() => store.state.editor.currentComponentRect)
    const currentComponentId = computed(() => store.state.editor.currentComponentId)

    const handleRemove = () => {
      store.commit('removeComponent', store.state.editor.currentComponentId)
    }

    return {
      wrapperRect,
      handleRemove,
      currentComponentId
    }
  },
})
</script>


<style lang="scss">
.component-cursor {
  position: absolute;
  border: 1px dashed #666;
  .remove {
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
}
</style>