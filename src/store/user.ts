import { UserOptions, GlobalStore } from './types'
import { Module } from 'vuex'

const userModule: Module<UserOptions, GlobalStore> = {
  state: {
    user: {
      name: 'tony',
      login: true
    }
  }
}

export default userModule
