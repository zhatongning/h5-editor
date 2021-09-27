<template>
  <div class="component-wrapper" :class="{ active }" @click="handleClick">
    <el-icon v-if="active" size="20" class="remove" @click="handleRemove">
      <delete  />
    </el-icon>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon } from 'element-plus'
import {  Delete } from '@element-plus/icons'

export default defineComponent({
  components: {
    ElIcon,
    [Delete.name]: Delete
  },
  props: {
    id: {
      type: String,
      require: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-wrapper-click', 'on-component-remove'],
  setup(props, context) {

    const handleClick = () => {
      context.emit('on-wrapper-click', props.id)
    }

    const handleRemove = () => {
      context.emit('on-component-remove', props.id)
    }

    return {
      handleClick,
      handleRemove
    }
  },
})
</script>


<style lang="scss">
  .component-wrapper {
    position: relative;
    width: auto;

    &.active::after {
      content: '';
      position: absolute;
      left: -5px;
      top: -5px;
      bottom: -5px;
      right: -5px;
      border: 1px dashed #666;
      z-index: 999;
    }

    .remove {
      position: absolute;
      right: -15px;
      top: -15px;
      cursor: pointer;
    }
  }


</style>
