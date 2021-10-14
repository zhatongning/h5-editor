<template>
  <div class="color-picker">
    <div class="all-color-selector">
      <input type="color" name="color-picker" :value="value" @input="(e) => handleChange(e.target.value)">
    </div>
    <ul class="recommand-color-list">
      <li v-for="color in recommendColorList" :key="color" class="item" @click="() => handleChange(color)">
        <div v-if="color.startsWith('#')" class="color-box" :style="{ backgroundColor: color }"></div>
        <div v-else class="color-box transparent-bg" ></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DefaultColorOptions } from '@/config/defaultColor'
export default defineComponent({
  name: 'color-pick',
  props: {
    value: {
      type: String
    },
    recommendColorList: {
      type: Array as PropType<string[]>,
      default: DefaultColorOptions
    }
  },
  emits: ['change'],
  setup(props, context) {
    const handleChange = (color: string) => {
      context.emit('change', color)
    }

    return {
      handleChange
    }
  }
})
</script>

<style lang="scss">
.color-picker {
  display: flex;
  align-items: center;
  .all-color-selector {
    margin-right: 10px;
  }
  .recommand-color-list {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-top: 6px;
      .color-box {
        width: 25px;
        height: 20px;
        margin-right: 6px;
      }
      .transparent-bg {
        background-image: url('../assets/images/transparent.jpeg');
      }
    }
  }

}
</style>