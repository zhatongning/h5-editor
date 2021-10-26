import { TFormsMap } from "."
import { genNumberInput } from './number-input'

export const positionOptions: TFormsMap = {
  left: genNumberInput('left', 'x轴坐标'),
  top: genNumberInput('top', 'y轴坐标')
}