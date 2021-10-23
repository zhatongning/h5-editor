<template>
  <div
    :class="['component-wrapper',  { 'is-dragable': isDragable }, { 'is-active': active } ]"
    @click="handleClick"
    @mousedown="handleDragStart"
    @mouseup="handleMouseUp"
    @mousedrag.prevent=""
    ref="wraperRef"
    :style="{ left: curPos.left + 'px', top: curPos.top + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      require: true
    },
    active: {
      type: Boolean
    },
    props: {
      type: Object,
      require: true
    }
  },
  emits: ['on-wrapper-click', 'on-component-remove', 'on-component-update'],
  setup(props, context) {
    const curPos = reactive<{ left: number, top: number }>({ left: 0, top: 0 })
    const isDragable = ref<boolean>(false)
    const wraperRef = ref<null | HTMLDivElement>(null)

    curPos.left = parseInt(props.props?.left) || 0
    curPos.top = parseInt(props.props?.top) || 0

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement)?.classList?.contains('component-wrapper')) return
      context.emit('on-wrapper-click', {
        id: props.id
      })
    }

    const offset = {x: 0, y: 0}
    const handleDragStart = (e: MouseEvent) => {
      if (!props.active) return
      const element = wraperRef.value
      const offsetParent = document.querySelector('.editor-page')
      if (element && offsetParent) {
        const { left, top } = element.getBoundingClientRect()
        const offsetParentRect = offsetParent.getBoundingClientRect()
        offset.x = e.clientX - left + offsetParentRect.left
        offset.y = e.clientY - top + offsetParentRect.top
      }
      document.body.addEventListener('mousemove', handleDrag)
    }

    const handleDrag = (e: MouseEvent) => {
      curPos.left = e.clientX  - offset.x
      curPos.top = e.clientY - offset.y
    }

    const handleMouseUp = () => {
      document.body.removeEventListener('mousemove', handleDrag)
      context.emit('on-component-update', {
        position: 'absolute',
        left: curPos.left + 'px',
        top: curPos.top + 'px'
      })
    }

    return {
      handleClick,
      handleDragStart,
      handleDrag,
      handleMouseUp,
      curPos,
      isDragable,
      wraperRef
    }
  },
})
</script>


<style lang="scss">
.component-wrapper {
  position: absolute;
  cursor: pointer;
  border: 2px solid transparent;
  &.is-dragable {
    cursor: move;
  }
  &.is-active {
    border: 2px solid #6ccfff;
  }
}
</style>
