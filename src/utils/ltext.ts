import { mapValues, without } from 'lodash-es'
import { CommonProps, TextProps } from '../types/editors'

export const commonDefaultProps: CommonProps = {
  // action
  actionType: "",
  url: "",

  // size
  height: "",
  width: "",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",

  // border
  borderStyle: "none",
  borderColor: "#000",
  borderWith: "0px",
  borderRadius: "0",

  // box shodow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: '',

  // position
  position: "static",
  left: "auto",
  right: "auto",
  top: "auto",
  bottom: "auto",
};

export const textDefaultProps: TextProps = {
  text: "内容",
  fontSize: "16px",
  fontWeight: 'normal',
  fontFamily: "",
  fontStyle: "normal",
  lineHeight: "initial",
  textDecoration: "none",
  textAlign: "left",
  color: "#000",
  backgroundColor: "white",
  ...commonDefaultProps,
}

export const generateVuePropsFromOptions = (options: TextProps) => {
  return mapValues(options, (value) => ({
    type: value.constructor as StringConstructor,
    default: value,
  }))
}

export const ltextComponentProps = generateVuePropsFromOptions(textDefaultProps);

export const commonStyleProps = without(Object.keys(textDefaultProps), 'url', 'text', 'actionType')
