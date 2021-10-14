<script lang="ts">
import { ConcreteComponent, defineComponent, h, resolveComponent } from 'vue'
import * as icons from '@element-plus/icons'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    class: {
      type: String
    },
  },
  emits: ['click'],
  render() {
    return h('div', { class: `figcap ${this.class}`, onclick: (e: MouseEvent) => { this.$emit('click', this.name, e) } }, [
      [
        h(resolveComponent('el-icon'), { size: 20 },
          [
            h(((icons as { [index: string]: ConcreteComponent })[this.name]), { style: { width: '1em', height: '1em' } })
          ]),
        h('span', { class: 'desc' }, this.desc)
      ]
    ])
  }
})
</script>


<style lang="scss" scoped>
.figcap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  color: #757e8a;
  &.active {
    color: #2354f4;
  }
  .desc {
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    cursor: pointer;
    margin-top: 4px;
  }
}
</style>
