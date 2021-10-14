import { CursorRect } from '@/types/editors'
export interface EditorOptions {
  components: EditorComponent[]
  // 当前选中的组件id
  currentComponentId: string
  currentComponentRect: CursorRect
}

export interface EditorComponent {
  props: Record<string, any>
  id: string
  // element+对应的组件名
  type: string
}

interface Userinfo {
  name: string
  login: boolean
}

export interface UserOptions {
  user: Userinfo
}

export interface GlobalStore {
  editor: EditorOptions,
  user: UserOptions
}
