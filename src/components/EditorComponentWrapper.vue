<template>
  <div
    :class="['component-wrapper',  { 'is-dragable': isDragable } ]"
    @click="handleClick"
    :draggable="true"
    @dragstart="handleDragStart"
    @dragover.prevent="handleDrag"
    @dragend="handleDragEnd"
    @mouseup="handleMouseUp"
    :style="{ left: curPos.x + 'px', top: curPos.y + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { getCursorWrapperRect } from '@/utils/getCursorWrapperRect'

export default defineComponent({
  props: {
    id: {
      type: String,
      require: true
    },
    active: {
      type: Boolean
    }
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate()
    }
  },
  emits: ['on-wrapper-click', 'on-component-remove', ],
  setup(props, context) {
    const curPos = reactive({ x: 0, y: 0 })
    const isDragable = ref<boolean>(false)

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList?.contains('component-wrapper')) return
      context.emit('on-wrapper-click', {
        id: props.id,
        componentRect: getCursorWrapperRect(e.target as HTMLElement)
      })
    }

    let startX = 0, startY = 0, initialLeft = 0, initialTop = 0
    const handleDragStart = (e: DragEvent) => {
      // isDragable.value = true
      e.stopPropagation()
      startX = e.x
      startY = e.y
      // e.dataTransfer?.setData('text/plain', '')
      initialLeft = parseInt((e.target as HTMLDivElement).style.left, 10)
      initialTop = parseInt((e.target as HTMLDivElement).style.top, 10)
    }

    const handleDrag = (e: DragEvent) => {
      curPos.x =  initialLeft + (e.x - startX)
      curPos.y = initialTop + e.y - startY
    }

    const handleMouseUp = () => {
      // isDragable.value = false
    }

    return {
      handleClick,
      handleDragStart,
      handleDrag,
      handleMouseUp,
      curPos,
      isDragable
    }
  },
})
</script>


<style lang="scss">
.component-wrapper {
  position: absolute;
  &.is-dragable {
    cursor: pointer;
  }
}
</style>
