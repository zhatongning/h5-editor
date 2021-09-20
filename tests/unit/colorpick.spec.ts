import ColorPicker from '@/components/ColorPicker.vue'
import { DefaultColorOptions } from '@/config/defaultColor'
import { mount } from '@vue/test-utils'
import rgbHex from 'rgb-hex'

const wrapper = mount(ColorPicker, {
  props: {
    value: '#000000'
  }
})


describe('test component: color picker', () => {
  it('the markup of colorpick', () => {

    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input').element
    expect(input.type).toBe('color')
    expect(input.value).toBe('#000000')
    expect(wrapper.findAll('li.item').length).toBe(DefaultColorOptions.length)
    const firstColorItem = wrapper.get('li.item:first-child div').element as HTMLDivElement
    const lastColorItem = wrapper.get('li.item:last-child div').element as HTMLDivElement
    expect(`#${rgbHex(firstColorItem.style.backgroundColor)}`).toBe(DefaultColorOptions[0])
    expect(lastColorItem.classList.contains('transparent-bg')).toBeTruthy()
  })


  it('the input color change trigger', async () => {
    const input = wrapper.get('input')
    const inputValue = '#000fff'
    await input.setValue(inputValue)
    expect(input.element.value).toBe(inputValue)
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()['change']).toHaveLength(1)
    expect(wrapper.emitted()['change'][0]).toEqual([inputValue])
  })


  it('the list color change trigger', async () => {
    await wrapper.get('li:first-child').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()['change'][1]).toEqual([DefaultColorOptions[0]])
  })

})
