<template>
  <div class="wrapper">
    <div class="nav-bar-list">
      <figcap v-for="(nav, idx) in NavListConfig" :key="nav.name" :class="['nav', { 'active': activeNavIndex === idx }]"  :name="nav.name" :desc="nav.desc" @click="handleNavClick" />
    </div>
    <div class="material-list">
      <component :is="NavListConfig[activeNavIndex].componentName" v-bind="$attrs"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MaterialText from './Text.vue'
import MaterialImage from './Image.vue'
import Figcap from '../Figcap.vue'

interface NavItem {
  name: string
  desc: string
  componentName: string
}

const NavListConfig: NavItem[] = [
  {
    name: 'IceTea',
    desc: '文字',
    componentName: 'material-text'
  },
  {
    name: 'HotWater',
    desc: '图像',
    componentName: 'material-image'
  },
  {
    name: 'IceCream',
    desc: '图形',
    componentName: 'material-shape'
  },
]

export default defineComponent({
  components: {
    MaterialText,
    MaterialImage,
    Figcap
  },
  setup() {
    const activeNavIndex = ref<number>(0)

    const handleNavClick = (name: string) => {
      activeNavIndex.value = NavListConfig.findIndex(nav => nav.name === name)
    }

    return {
      NavListConfig,
      activeNavIndex,
      handleNavClick
    }
  },
})
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
  .nav-bar-list {
    width: 65px;
    height: 100%;
    box-shadow: inset -1px 0 0 0 #ebedf0;

    .nav {
      cursor: pointer;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0
      }
    }
  }
  .material-list {
    display: flex;
    width: calc(100% - 65px);
    flex-direction: column;
    align-items: center;
    .component-item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

</style>
