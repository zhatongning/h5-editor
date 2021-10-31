<template>
  <div>
    <div class="shape-item" v-for="shape in ShapetemplateConfig" :key="shape.id" @click="addShape(shape)">
      <component :is="'l-shape'" v-bind="shape"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { ShapeProps } from 'h5-editor-stripe'
import { defineComponent } from 'vue'
import { ShapetemplateConfig } from './template'

export default defineComponent({
  emits: ['on-template-click'],
  setup(_, context) {
    const addShape = (props: Partial<ShapeProps>) => {
      context.emit('on-template-click', {
        type: 'l-shape',
        props
      })
    }

    return {
      addShape,
      ShapetemplateConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.shape-item {
  margin-top: 10px;
  cursor: pointer;
}
</style>
