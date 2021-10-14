<template>
  <div class="component-list">
    <div class="template-item" v-for="(template, idx) in TemplatesConfig" :key="idx" @click="onItemClick(template)">
      <component :is="'l-text'" v-bind="template" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EditorComponent } from '../../store/types'
import { TextTemplatesConfig as TemplatesConfig } from './template'

export default defineComponent({
  emits: ['on-template-click'],
  setup(props, context) {
    const onItemClick = (options: EditorComponent['props']) => {
      context.emit('on-template-click', { type: 'l-text', props: options })
    }
    return {
      TemplatesConfig,
      onItemClick
    }
  }
})
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .template-item {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
