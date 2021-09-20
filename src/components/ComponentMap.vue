<template>
  <div class="wrapper">
    <div class="component-item" v-for="component in propsComponents" :key="component.id">
      <label class="label" :for="component.id">
        {{ component.label }}
      </label>
      <component
        class="item-editor"
        :id="component.id"
        :is="component.component"
        :[component.valueProp]="component.value"
        v-bind="component.otherProps"
        v-on="{
          [component.eventName]: (e) => component.eventListerer(e, component.id)
        }"
      >
        {{ component.text }}
        <template v-slot:[component.subComponents?.slot]>
          <template v-if="component.subComponents && component.subComponents.subComponents" >
            <component :is="component.subComponents?.component" v-for="(option, childKey) in component.subComponents.options" v-bind="option" :key="childKey">
              <template v-if="component.subComponents?.subComponents && component.subComponents?.subComponents.component && component.subComponents.subComponents.options">
                <template v-for="(childChildOption, chichiKey) in component.subComponents.subComponents.options" :key="chichiKey">
                  <component :is="component.subComponents?.subComponents?.component"  v-bind="childChildOption" >
                    <v-node-renderer :vnode="childChildOption.text"/>
                  </component>
                </template>
              </template>
            </component>
          </template>
          <template v-else-if="component.subComponents">
            <component :is="component.subComponents?.component" v-for="(option, childKey) in component.subComponents.options" v-bind="option" :key="childKey"></component>
          </template>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { FormsMap, FormMap } from '../utils/propsMap'
import { TextProps } from '../types/editors'
import { reduce } from 'lodash-es'
import VNodeRenderer from './VNodeComponent'
import ColorPicker from '@/components/ColorPicker.vue'

interface PropFormMap extends FormMap {
  value: string
  eventListerer: (key: string, value: MouseEvent | string | number) => void
}

type PropsFormMap = {
  [p in keyof TextProps]: PropFormMap
}

export default defineComponent({
  components: {
    VNodeRenderer,
    ColorPicker
  },
  props: {
    props: {
      type: Object,
    },
  },
  emits: ['on-change'],
  setup(props, context) {

    const propsComponents = computed(() =>
      reduce(props.props, (calc, value, key) => {
        const newKey = key as keyof TextProps
        if (FormsMap[newKey]) {
          const keyMaps = FormsMap[newKey] as FormMap
          console.log(keyMaps.beforeFormatter)
          calc[newKey] = {
           ...keyMaps,
            value: keyMaps.beforeFormatter ? keyMaps.beforeFormatter(value) : value,
            eventListerer: (e: any, key: string) => {
              context.emit('on-change', key,  keyMaps.afterFormattter ? keyMaps.afterFormattter(e) : e)
            }
          } as PropFormMap
        }
        return calc
      }, {} as PropsFormMap)
    )

    return {
      propsComponents
    }
  },
})
</script>

<style lang="scss">
.component-item {
  display: flex;
  margin: 20px 0;
  padding: 0 10px;
}

.label {
  flex: 100px 0 0;
}
.item-editor {
}
</style>
