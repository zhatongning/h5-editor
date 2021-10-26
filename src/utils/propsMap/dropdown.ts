import { TFormsMap } from './types'
import { VNode } from '@vue/runtime-core'

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
  borderStyle: {
    id,
    component: 'ElDropdown',
    label,
    eventName: 'command',
    otherProps: {
      'split-button': true,
      type: "primary",
      trigger: 'click',
    },
    slots: {
      default: {
        component: 'span',
        options: [{
          text
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