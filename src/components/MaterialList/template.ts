import { TextProps } from 'h5-editor-stripe'
const prefix =  "http://ttttf.oss-cn-hangzhou.aliyuncs.com/editors/assets"

interface LTextProps extends Partial<TextProps> {
  tag?: string
}

export const TextTemplatesConfig: LTextProps[] = [
  {
    text: '添加大标题',
    fontSize: '30px',
    fontWeight: '700',
    textAlign: 'center',
    tag: 'h2',
    marginTop: '0px',
    marginBottom: '0px',
    position: 'absolute',
  },
  {
    text: '添加副标题',
    fontFamily: 'KaiTi, STKaiti',
    fontWeight: '700',
    textAlign: 'center',
    color: 'rgb(0, 0, 0)',
    tag: 'h2'
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
    borderWith: '1px',
    borderRadius: '2px',
    textAlign: 'center'
  },
]

export const ImageTemplateConfig = [
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