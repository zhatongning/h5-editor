import { EditorOptions, EditorComponent ,GlobalStore } from "./types";
import { Module } from 'vuex'
import { v4 as uuid } from 'uuid'


const editorModule: Module<EditorOptions, GlobalStore> = {
  state: () => ({
    components: [],
    currentComponentId: '',
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
    },
    setActive(state: EditorOptions, payload: { id: string }) {
      console.log(payload.id)
      state.currentComponentId = payload.id
    },
    updateComponent(state, options: { [index: string]: any }) {
      const currentComponent = state.components.find(comp => comp.id === state.currentComponentId)
      if (currentComponent) {
        Object.keys(options).forEach((key) => {
          currentComponent.props[key] = options[key]

        })
      }
    }
  },
  actions: {}
}

export default editorModule
