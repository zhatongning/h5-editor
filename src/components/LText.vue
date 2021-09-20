<template>
  <component :is="tag" :style="styleProps" @click="handleUrlClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ltextComponentProps, commonStyleProps } from '../utils/ltext'
import { useComponentCommon } from '../hooks/useComponentCommon'

export default defineComponent({
  name: 'l-text',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    ...ltextComponentProps
  },
  setup(props) {
    const { styleProps, handleUrlClick } = useComponentCommon(props, commonStyleProps)

    return {
      styleProps,
      handleUrlClick
    }
  },
})
</script>


<style>
  .ltext {

  }
</style>
