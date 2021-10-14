<template>
  <div class="component-wrapper" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCursorWrapperRect } from '@/utils/getCursorWrapperRect'

export default defineComponent({
  props: {
    id: {
      type: String,
      require: true
    }
  },
  emits: ['on-wrapper-click', 'on-component-remove'],
  setup(props, context) {

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList?.contains('component-wrapper')) return
      context.emit('on-wrapper-click', {
        id: props.id,
        componentRect: getCursorWrapperRect(e.target as HTMLElement)
      })
    }

    return {
      handleClick
    }
  },
})
</script>


<style lang="scss">
.component-wrapper {
  position: absolute;
}
</style>
