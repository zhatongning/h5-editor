import store from '../../src/store'
import { defaultEditorComponents } from '../../src/store/editor'
import { last, first } from 'lodash'

describe('the app store', () => {

  it('store has the properties', () => {
    expect(store.hasModule('editor')).toBeTruthy()
    expect(store.hasModule('user')).toBeTruthy()
  })

  it('editor module: default editor components', () => {
    expect(store.state.editor.components.length).toBe(defaultEditorComponents.length)
    expect(store.state.editor.currentComponentId).toBe('')
  })


  it('editor module: setActive commit', () => {
    store.commit('setActive', defaultEditorComponents[0].id)
    expect(store.state.editor.currentComponentId).toBe(defaultEditorComponents[0].id)
  })

  it('editor module: addComponaent commit', () => {
    const newComponnet = { text: 'a new component' }
    store.commit('addComponent', newComponnet)
    store.commit('addComponent', newComponnet)
    expect(store.state.editor.components.length).toBe(defaultEditorComponents.length + 2)
    expect(last(store.state.editor.components)?.props.text).toBe(newComponnet.text)
  })

  it('editor module: updateComponent commit', () => {
    const updateText = { key: 'text', value: 'new updated text' }
    store.commit('setActive', defaultEditorComponents[0].id)
    store.commit('updateComponent', updateText)
    expect(store.state.editor.components[0].props.text).toBe(updateText.value)
  })

  it('editor module: remove commit', () => {
    store.commit('removeComponent', defaultEditorComponents[0].id)
    expect(store.state.editor.components.length).toBe(defaultEditorComponents.length + 2 - 1)
    expect(first(store.state.editor.components)?.props.text).toBe(defaultEditorComponents[1].props.text)
  })

})

