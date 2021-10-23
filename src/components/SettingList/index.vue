<template>
  <el-tabs class="editor-setting-tabs" v-model="activeTab" type="border-card" @tab-click="handleTabChange">
    <el-tab-pane v-for="tab in tabsConfig" :key="tab.name" :label="tab.label" :name="tab.name">
      <v-node-component :vnode="tab.content" ></v-node-component>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, h, VNode } from 'vue'
import PropsSetting from './Props.vue'
import VNodeComponent from '../VNodeComponent'

type Tabs = 'basic' | 'layer' | 'page'

export default defineComponent({
  components: {
    VNodeComponent
  },
  setup(props, context) {
    const activeTab = ref<Tabs>('basic')
    const tabsConfig: { label: string, name: Tabs, content: VNode }[] = [
      {
        label: '属性设置',
        name: 'basic',
        content: h(PropsSetting, { ...context.attrs })
      },
      {
        label: '图层设置',
        name: 'layer',
        content: h('div', {}, 'hello'),
      },
      {
        label: '页面设置',
        name: 'page',
        content: h('div', {}, 'page'),
      },
    ]

    const handleTabChange = (tab: any) => {
      console.log('handleTabChange')
    }

    return {
      activeTab,
      tabsConfig,
      handleTabChange
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-setting-tabs {
  height: 100%;
}
</style>
