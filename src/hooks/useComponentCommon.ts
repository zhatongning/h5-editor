import { defineComponent, computed } from 'vue'
import { pick } from 'lodash-es'
import { TextProps } from '../types/editors'

export const useComponentCommon = (props: Readonly<Partial<TextProps>>, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks))

  const handleUrlClick = () => {
    if (props.actionType === 'url' && props.url) {
      // window.location.href = props.url
    }
  }

  return {
    styleProps,
    handleUrlClick
  }

}