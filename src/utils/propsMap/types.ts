import { TextProps } from 'h5-editor-stripe'
import { CSSProperties } from '@vue/runtime-dom'
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

  wrapperStyle?: CSSProperties

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

export type TFormsMap = { [p in AllPropsUnion]?: FormMap }
