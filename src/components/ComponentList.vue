<template>
  <div class="component-list">
    <div v-for="(template, idx) in TemplatesConfig" :key="idx" @click="onItemClick(template)">
      <component v-bind:is="'l-text'" v-bind="template" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TemplatesConfig } from '../config/template'
import { EditorComponent } from '../store/types'
import LText from '../components/LText.vue'

export default defineComponent({
  emits: ['on-template-click'],
  components: {
    LText
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
