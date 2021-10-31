import { TFormsMap } from './types'
import { VNode } from '@vue/runtime-core'
import { h } from '@vue/runtime-dom'
import { ArrowDown } from '@element-plus/icons'

interface DropdownOption {
  id: string
  label: string
  text: string
  itemOptions: { command: string, text: string | VNode }[]
}

/**
 * @func 配置下拉框
 * @param id { string } 属性名
 * @param label { string } label
 * @param text { string } 下拉按钮的文本
 * @param itemOptions { { command: string, text: string | VNode }[] } 下拉选项
 */
export const configDropdown: (options: DropdownOption) => TFormsMap = ({
  id,
  label,
  text,
  itemOptions,
}) => ({
  [id]: {
    id,
    component: 'ElDropdown',
    label,
    eventName: 'command',
    otherProps: {
      type: "primary",
      trigger: 'click',
    },
    slots: {
      default: {
        component: 'el-button',
        options: [{
          text: h('span', { style: {
            display: 'flex',
            alignItems: 'center'
          } }, [
            text,
            h(ArrowDown, { style: { marginLeft: '5px' },width: '1em', height: '1em', fontWeight: 600 })
          ])
        }],
      },
      dropdown: {
        component: 'ElDropdownMenu',
        options: [{}],
        slots: {
          default: {
            component: 'ElDropdownItem',
            options: [...itemOptions]
          }
        }
      }
    }
  }
})