import { CSSProperties, h, resolveComponent } from '@vue/runtime-dom'
import { CommonProps, TextProps } from 'h5-editor-stripe'
import { AllPropsUnion, FormMap, TFormsMap } from './types'
import { getNumberInputOptions } from './number-input'
import { getBorderOptions } from './border'
import { positionOptions } from './position'
import { configDropdown } from './dropdown'
export * from './types'

const FontFamilyArray = [{
  text: '宋体',
  command: '"SimSun", "STSong"',
}, {
  text: '黑体',
  command: '"SimHei", "STHeiti"',
},
{
  text: '楷体',
  command: '"KaiTi", "STKaiti"',
}, {
  text: '仿宋',
  command: '"FangSong", "STFangSong"',
}]

const FontFamilyOptions = FontFamilyArray.map((font) => {
  return {
    command: font.command,
    text: <span style={ { fontFamily: font.command } }>{ font.text }</span>
  }
})

export const FormsMap: TFormsMap = {
  width: {
    id: 'width',
    component: "ElInput",
    label: '宽度',
    valueProp: 'model-value',
    eventName: 'input',
    beforeFormatter: (source: string) => parseInt(source),
    afterFormattter: (source: number) => `${source}px`
  },
  height: {
    id: 'height',
    component: "ElInput",
    label: '高度',
    valueProp: 'model-value',
    eventName: 'input',
    beforeFormatter: (source: string) => parseInt(source),
    afterFormattter: (source: number) => `${source}px`
  },
  text: {
    id: 'text',
    component: "ElInput",
    label: '文本',
    valueProp: 'model-value',
    eventName: 'input'
  },
  fontSize: {
    id: 'fontSize',
    component: "ElInput",
    label: '字号',
    valueProp: 'model-value',
    eventName: 'input',
    otherProps: {
      type: 'number'
    },
    beforeFormatter: (source: string) => parseInt(source),
    afterFormattter: (source: number) => `${source}px`
  },
  fontWeight: {
    id: 'fontWeight',
    component: 'el-button',
    wrapperStyle: {
      display: 'inline-block',
      marginLeft: '100px'
    },
    label: '',
    eventName: 'click',
    valueProp: 'data-value',
    otherProps: (value: string) => {
      return {
        type: value === 'bold' ? "primary" : 'normal',
        round: true,
        size: 'medium',
        style: { fontWeight: 700,  width: '45px', padding: '10px' }
      }
    },
    afterFormattter: (e) => e?.target?.dataset.value === 'bold' ? 'normal' : 'bold',
    slots: {
      default: {
        component: 'span',
        options: [
          {
            text: 'B'
          }
        ]
      }
    }
  },
  fontStyle: {
    id: 'fontStyle',
    component: 'el-button',
    wrapperStyle: {
      display: 'inline-block',
    },
    label: '',
    valueProp: 'data-value',
    eventName: 'click',
    otherProps: (value: string) => ({
      type: value === 'italic' ? "primary" : 'normal',
      round: true,
      size: 'medium',
      style: { fontStyle: 'italic', fontWeight: 700, width: '45px', padding: '10px' },
    }),
    afterFormattter: (e) => e?.target?.dataset.value === 'italic' ? 'normal' : 'italic',
    slots: {
      default: {
        component: 'span',
        options: [
          {
            text: 'I'
          }
        ]
      }
    }
  },
  textDecoration: {
    id: 'textDecoration',
    component: 'el-button',
    wrapperStyle: {
      display: 'inline-block',
    },
    label: '',
    eventName: 'click',
    valueProp: 'data-value',
    otherProps: (value: string) => ({
      type: value === 'underline' ? "primary" : 'normal',
      round: true,
      size: 'medium',
      style: { textDecoration: 'underline', fontWeight: 700, width: '45px', padding: '10px' },
    }),
    afterFormattter: (e) => e?.target?.dataset.value === 'underline' ? 'none' : 'underline',
    slots: {
      default: {
        component: 'span',
        options: [
          {
            text: 'U'
          }
        ]
      }
    }
  },
  color: {
    id: 'color',
    component: 'color-picker',
    label: '文字颜色',
    valueProp: 'value',
    eventName: 'change'
  },
  backgroundColor: {
    id: 'backgroundColor',
    component: 'color-picker',
    label: '背景颜色',
    valueProp: 'value',
    eventName: 'change'
  },
  lineHeight: {
    id: 'lineHeight',
    component: 'ElSlider',
    label: '行高',
    valueProp: 'model-value',
    eventName: 'input',
    beforeFormatter: (source: string) => parseInt(source),
    afterFormattter: (source: number) => `${source}`,
    otherProps: {
      width: '100%',
      step: 0.1,
      min: 0,
      max: 3
    }
  },
  fontFamily: configDropdown({
    id: 'fontFamily',
    label: '字体',
    text: '选择字体',
    itemOptions: [{
      command: '',
      text: '无'
    }, ...FontFamilyOptions]
  }).fontFamily,
  imageSrc: {
    id: 'imageSrc',
    component: 'image-processor',
    label: '图片更新',
    valueProp: 'url',
    eventName: 'on-change'
  },
  textAlign: {
    id: 'textAlign',
    component: 'ElRadioGroup',
    eventName: 'change',
    label: '对齐',
    otherProps: {
      size: 'small'
    },
    valueProp: 'model-value',
    slots: {
      default: {
        component: 'ElRadioButton',
        options: [
          {
            label: 'left',
          },
          {
            label: 'center',
          },
          {
            label: 'right',
          }]
      }
    }
  },
  ...getNumberInputOptions(),
  ...getBorderOptions(),
  ...positionOptions
}
