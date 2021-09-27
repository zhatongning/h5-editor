<template>
  <div class="component-list">
    <div v-for="(template, idx) in TemplatesConfig" :key="idx" @click="onItemClick(template)">
      <component v-bind:is="'l-text'" v-bind="template" />
    </div>

    <uploader upload-url="http://127.0.0.1:3000/upload"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TemplatesConfig } from '../config/template'
import { EditorComponent } from '../store/types'
import Uploader from './Uploader.vue'

export default defineComponent({
  emits: ['on-template-click'],
  components: {
    Uploader
  },
  setup(props, context) {
    const onItemClick = (options: EditorComponent['props']) => {
      context.emit('on-template-click', options)
    }

    return {
      TemplatesConfig,
      onItemClick
    }
  },
})
</script>


<style></style>
