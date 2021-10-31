<template>
  <div class="collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <template v-for="item in itemList">
        <el-collapse-item :key="item.name" v-if="!isEmpty(pick($attrs.props, item.propKeys))" :title="item.title" :name="item.name">
          <props-to-els :props="pick($attrs.props, item.propKeys)" v-bind="omitPropAttrs"/>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PropsToEls from './PropsToEls.vue'
import { pick, omit, isEmpty } from 'lodash-es'

const itemList: { name: string, title: string, propKeys: string[] }[] = [
  {
    name: 'basic',
    title: '基本属性',
    propKeys: ['text', 'fontSize', 'fontFamily', 'fontWeight', 'fontStyle', 'textDecoration' ,'lineHeight', 'textAlign', 'color', 'backgroundColor']
  },
  {
    name: 'bounding',
    title: '尺寸',
    propKeys: ['width', 'height', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
  },
  {
    name: 'border',
    title: '边框',
    propKeys: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius']
  },
  {
    name: 'axis',
    title: '位置',
    propKeys: ['left', 'top']
  }
]

export default defineComponent({
  components: {
    PropsToEls
  },
  methods: {
    pick,
    isEmpty,
  },
  setup(props, context) {
    const omitPropAttrs = computed(() => omit(context.attrs, ['props']))

    return {
      itemList,
      omitPropAttrs
    }
  }
})
</script>

<style lang="scss" scoped>
.collapse {

}
</style>
