import { createStore, Module } from "vuex";
import { EditorOptions, UserOptions, GlobalStore } from './types'
import editorModule from './editor'
import userModule from "./user";


export default createStore<GlobalStore>({
  modules: {
    editor: editorModule,
    user: userModule
  },
});
