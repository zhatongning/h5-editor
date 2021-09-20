export interface CommonProps {
  actionType: string;
  url: string;

  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;

  // border
  borderStyle: string;
  borderColor: string;
  borderWith: string;
  borderRadius: string;

  // box shodow and opacity
  boxShadow: string;
  opacity: string; // 这个后期需要处理

  // position
  position: string;
  left: string;
  right: string;
  top: string;
  bottom: string;
}

export interface TextProps extends CommonProps {
  text: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  fontStyle: string;
  lineHeight: string;
  textDecoration: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
