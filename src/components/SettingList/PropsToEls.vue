<template>
  <div class="wrapper">
    <div class="component-item" v-for="component in propsComponents" :key="component.id" :style="component.wrapperStyle">
      <label class="label">
        {{ component.label }}
      </label>
      <component
        class="item-editor"
        :is="component.component"
        :[component.valueProp]="component.value"
        v-bind="typeof component.otherProps === 'function' ? component.otherProps(component.value) : component.otherProps"
        v-on="{
          [component.eventName]: (e) => component.eventListerer(e, component.id)
        }"
      >
        <template v-for="(item, slotName) in component.slots" v-slot:[slotName]>
          <component :is="item.component" v-for="(option, index) in item.options" v-bind="option" :key="index" >
            <span v-if="option && option.text">{{ option.text }}</span>
            <template v-for="(childItem, childSlotName) in item.slots" v-slot:[childSlotName]>
              <component :is="childItem.component" v-for="(opt, childIndex) in childItem.options" v-bind="opt" :key="childIndex" >
                <span v-if="typeof opt.text === 'string'" >
                  {{ opt.text }}
                </span>
                <v-node-renderer v-else :vnode="opt.text" />
              </component>
            </template>
          </component>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { FormsMap, FormMap, AllPropsUnion } from '../../utils/propsMap/index'
import { reduce } from 'lodash-es'
import VNodeRenderer from '../VNodeComponent'
import ColorPicker from '@/components/ColorPicker.vue'
import ImageProcessor from '../ImageProcessor.vue'

interface PropFormMap extends FormMap {
  value: string
  eventListerer: (key: string, value: MouseEvent | string | number) => void
}

type PropsFormMap = {
  [p in AllPropsUnion]: PropFormMap
}

export default defineComponent({
  components: {
    VNodeRenderer,
    ColorPicker,
    ImageProcessor
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
        const newKey = key as AllPropsUnion
        if (FormsMap[newKey]) {
          const keyMaps = FormsMap[newKey] as FormMap
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
  flex-grow: 1;
}
</style>
