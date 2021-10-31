import { configDropdown } from './dropdown'
import { TFormsMap } from './types'
import { configSlider } from './slider-property'

export const getBorderOptions: () => TFormsMap = () => {
  return {
    ...configDropdown({
      id: 'borderStyle',
      label: '边框类型',
      text: '选择边框样式',
      itemOptions: [
        {
          command: '',
          text: '无'
        },
        {
          command: 'solid',
          text: <span style={{ borderWidth: '2px', borderStyle: 'solid', width: '50px', display: 'inline-block' }}></span>
        },
        {
          command: 'dashed',
          text: <span style={{ borderWidth: '2px', borderStyle: 'dashed', width: '50px', display: 'inline-block' }}></span>
        },
        {
          command: 'dotted',
          text: <span style={{ borderWidth: '2px', borderStyle: 'dotted', width: '50px', display: 'inline-block' }}></span>
        }
      ]
    }),
    borderColor: {
      id: 'borderColor',
      component: 'color-picker',
      label: '边框颜色',
      valueProp: 'value',
      eventName: 'change'
    },
    ...configSlider({
      id: 'borderWidth',
      label: '边框宽度',
      step: 1,
      min: 0,
      max: 20,
      afterFormatter: (source: string) => `${source}px`,
    }),
    ...configSlider({
      id: 'borderRadius',
      label: '边框圆角',
      step: 1,
      min: 0,
      max: 200,
      afterFormatter: (source: string) => `${source}px`,
    })
  } as TFormsMap
}
