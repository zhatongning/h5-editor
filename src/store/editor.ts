import { EditorOptions, EditorComponent ,GlobalStore } from "./types";
import { Module } from 'vuex'
import { v4 as uuid } from 'uuid'
import { TextProps } from "@/types/editors";

export const defaultEditorComponents = [
  {
    id: uuid(),
    type: 'l-text',
    props: {
      fontSize: '18px',
      color: 'pink',
      text: '文案一',
      lineHeight: 1
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
      color: 'red',
      text: '主要按钮3',
      fontFamily: '黑体'
    }
  },
]

const editorModule: Module<EditorOptions, GlobalStore> = {
  state: () => ({
    components: [...defaultEditorComponents],
    currentComponentId: ''
  }),
  getters: {
    activeComponent(state) {
      return state.components.find(comp => comp.id === state.currentComponentId)
    }
  },
  mutations: {
    addComponent(state: EditorOptions, payload: Partial<EditorComponent['props']>) {
      state.components.push({
        id: uuid(),
        type: 'l-text',
        props: {...payload}
      })
    },
    removeComponent(state: EditorOptions, payload: string) {
      state.components = state.components.filter(component => component.id !== payload)
    },
    setActive(state: EditorOptions, payload: string) {
      state.currentComponentId = payload
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
