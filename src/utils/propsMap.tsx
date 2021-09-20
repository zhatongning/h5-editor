import { TextProps } from "@/types/editors"

export interface FormMapSubComponents {
  component: string
  options: any[]
  slot?: string

  subComponents?: FormMapSubComponents

}
export interface FormMap {
  component: string
  id: string
  label: string

  text?: string
  valueProp: string
  eventName: string
  otherProps?: {
    [index: string]: any
  }

  beforeFormatter?(opt: any): any
  afterFormattter?(opt: any): any

  subComponents?: FormMapSubComponents

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


export const FormsMap: { [p in keyof TextProps]?: FormMap } = {
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
    valueProp: 'value',
    eventName: 'command',
    otherProps: {
      'split-button': true,
      type: "primary",
      trigger: 'click',
    },
    text: '选择字体',
    subComponents: {
      slot: "dropdown",
      component: 'ElDropdownMenu',
      options: [{}],
      subComponents: {
        component: 'ElDropdownItem',
        options: [{
          command: '',
          text: '无'
        }, ...FontFamilyOptions]
      }
    }
  }
}

