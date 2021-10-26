import { CommonProps } from 'h5-editor-stripe'
import { FormMap } from '.'
import { TFormsMap } from './types'

const numberInputOptions = [
  {
    id: 'paddingTop',
    desc: '上边距'
  },
  {
    id: 'paddingRight',
    desc: '右边距'
  },
  {
    id: 'paddingBottom',
    desc: '下边距'
  },
  {
    id: 'paddingLeft',
    desc: '左边距'
  },
]
export const getNumberInputOptions: () => TFormsMap = () => {
  return numberInputOptions.reduce((calc: TFormsMap, cur: { id: string, desc: string }) => {
    const key = cur.id as keyof CommonProps
    calc[key] = genNumberInput(key, cur.desc)
    return calc
  }, {} as TFormsMap)
}

export const genNumberInput = (id: string, label: string): FormMap => ({
  id,
  component: 'ElInput',
  label,
  otherProps: {
    type: 'number',
  },
  valueProp: 'model-value',
  eventName: 'input',
  beforeFormatter: (source: string) => parseInt(source),
  afterFormattter: (source: number) => `${source}px`,
})

