import { TextProps } from 'h5-editor-stripe'

export type AllPropsUnion = (keyof TextProps)| 'imageSrc'

interface SubSlot {
  [index: string]: SlotOption
}

export interface SlotOption {
  component: string
  options: any[]
  slots?: SubSlot

}
export interface FormMap {
  component: string
  id: string
  label: string

  text?: string
  valueProp?: string
  eventName: string
  otherProps?: {
    [index: string]: any
  }

  beforeFormatter?(opt: any): any
  afterFormattter?(opt: any): any

  slots?: SubSlot

}

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

export const FormsMap: { [p in AllPropsUnion]?: FormMap } = {
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
  color: {
    id: 'color',
    component: 'color-picker',
    label: '颜色',
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
  fontFamily: {
    id: 'fontFamily',
    component: 'ElDropdown',
    label: '字体',
    eventName: 'command',
    otherProps: {
      'split-button': true,
      type: "primary",
      trigger: 'click',
    },
    text: '选择字体',
    slots: {
      default: {
        component: 'span',
        options: [{
          text: '选择字体'
        }],
      },
      dropdown: {
        component: 'ElDropdownMenu',
        options: [{}],
        slots: {
          default: {
            component: 'ElDropdownItem',
            options: [{
              command: '',
              text: '无'
            }, ...FontFamilyOptions]
          }
        }
      }
    }
  },
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
  }
}
