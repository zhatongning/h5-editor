import { config } from '@vue/test-utils'
import { ImageProps, TextProps } from 'h5-editor-stripe'
const prefix =  "http://ttttf.oss-cn-hangzhou.aliyuncs.com/editors/assets"

interface LTextProps extends Partial<TextProps> {
  tag?: string
}

export const TextTemplatesSpecialConfig: LTextProps[] = [
  {
    text: '添加大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    tag: 'h2',
    color: 'rgb(0, 0, 0)',
    width: '200px',
    height: '42px',
  },
  {
    text: '添加副标题',
    fontFamily: 'KaiTi, STKaiti',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(0, 0, 0)',
    tag: 'h2',
    fontSize: '24px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    left: '0px',
    top: '0px'
  },
  {
    text: '输入内容',
    fontFamily: 'Muyao-Softbrush, Arial, SimSun, sans-serif',
    fontSize: '45px',
  },
  {
    text: '添加正文内容',
    tag: 'p',
    lineHeight: '1',
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgb(0, 0, 0)',
    textAlign: 'center'
  },
  {
    text: '添加宋体正文内容',
    tag: 'p',
    lineHeight: '1',
    fontFamily: 'SimSun, STSong',
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgb(0, 0, 0)',
    textAlign: 'center'
  },
  {
    text: 'Hello World, Hello Vue',
    tag: 'p',
    lineHeight: '1',
    fontFamily: 'Comic Sans MS',
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgb(0, 0, 0)',
    textAlign: 'center'
  },
  {
    fontSize: '14px',
    text: '链接内容',
    textDecoration: 'underline',
    lineHeight: '1',
    textAlign: 'center',
    color: 'rgb(24, 144, 255)',
    tag: 'p',
  },
  {
    text: '按钮内容',
    backgroundColor: 'rgb(24, 144, 255)',
    color: 'rgb(255, 255, 255)',
    width: '100px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderWidth: '1px',
    borderRadius: '2px',
    textAlign: 'center'
  },
]

// 额外的一些默认样式， 需要根据当前所拥有的样式生成对应样式的编辑器。
const extraTextConfig = {
  textAlign: 'center',
  fontStyle: 'normal',
  textDecoration: 'none',
}

const genaralConfig = {
  paddingTop: '0px',
  paddingRight: '0px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  borderStyle: 'none',
  borderColor: 'transparent',
  borderWidth: '0px',
  borderRadius: '0px'
}

const ImageTemplateSpecialConfig = [
  {
    imageSrc: `${prefix}/decoration-wrapper`,
    width: '150px',
  },
  {
    imageSrc: `${prefix}/2021`,
    width: '150px',
  },
  {
    imageSrc: `${prefix}/hot-sell`,
    width: '150px',
  },
  {
    imageSrc: `${prefix}/merry-chrismas`,
    width: '150px',
  },
]

export const TextTemplatesConfig = TextTemplatesSpecialConfig.map(config => ({ ...extraTextConfig, ...genaralConfig, ...config }))

// 图片默认是可以拖拽的，导出的图片默认配置成不可拖拽
ImageTemplateSpecialConfig.forEach((item) => {
  Object.defineProperty(item, 'draggable', {
    value: false,
    configurable: false,
    enumerable: true,
    writable: false
  })
})
export const ImageTemplateConfig = ImageTemplateSpecialConfig.map(config => ({ ...genaralConfig, ...config }))