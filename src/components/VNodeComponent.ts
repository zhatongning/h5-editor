import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    vnode: {
      type: [Object, String]
    }
  },
  render() {
    return this.vnode
  },
})