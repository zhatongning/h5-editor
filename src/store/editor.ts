import { EditorOptions, EditorComponent ,GlobalStore } from "./types";
import { Module } from 'vuex'
import { v4 as uuid } from 'uuid'
import { CursorRect } from "@/types/editors";

export const defaultEditorComponents = [
  {
    id: uuid(),
    type: 'l-text',
    props: {
      fontSize: '18px',
      color: 'pink',
      text: '文案一',
      lineHeight: '1'
    }
  },
  {
    id: uuid(),
    type: 'l-text',
    props: {
      text: '文案二',
      actionType: 'url',
      url: 'https://www.baidu.com'
    }
  },
  {
    id: uuid(),
    type: 'l-text',
    props: {
      fontSize: '32px',
      color: '#ff0000',
      text: '主要按钮3',
      fontFamily: '黑体'
    }
  },
]

const editorModule: Module<EditorOptions, GlobalStore> = {
  state: () => ({
    components: [...defaultEditorComponents],
    currentComponentId: '',
    currentComponentRect: {} as CursorRect
  }),
  getters: {
    activeComponent(state) {
      return state.components.find(comp => comp.id === state.currentComponentId)
    }
  },
  mutations: {
    addComponent(state: EditorOptions, payload: { type: 'l-text' | 'l-image' | 'l-shape', props: { [index: string]: any } }) {
      state.components.push({
        id: uuid(),
        type: payload.type,
        props: {...payload.props}
      })
    },
    removeComponent(state: EditorOptions, payload: string) {
      state.components = state.components.filter(component => component.id !== payload)
      state.currentComponentId = ''
      state.currentComponentRect = {} as CursorRect
    },
    setActive(state: EditorOptions, payload: { id: string, componentRect: CursorRect }) {
      state.currentComponentId = payload.id
      state.currentComponentRect = payload.componentRect
    },
    updateComponent(state, { key, value }) {
      const currentComponent = state.components.find(comp => comp.id === state.currentComponentId)
      if (currentComponent) {
        currentComponent.props[key] = value
      }
    }
  },
  actions: {}
}

export default editorModule
