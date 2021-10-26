
import { TFormsMap } from './types'

interface SliderOption {
  id: string
  label: string
  step: number
  min: number
  max: number,
  afterFormatter?: (opt: string) => number | string
}

export const configSlider = (options: SliderOption): TFormsMap => ({
  [options.id]: {
    id:options.id,
    component: 'ElSlider',
    label: options.label,
    valueProp: 'model-value',
    eventName: 'input',
    beforeFormatter: (source: string) => parseInt(source),
    afterFormattter: options.afterFormatter,
    otherProps: {
      width: '100%',
      step: options.step,
      min: options.min,
      max: options.max
    }
  }
})
