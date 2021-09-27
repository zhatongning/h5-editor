import { flushPromises, mount, shallowMount, VueWrapper } from '@vue/test-utils'
import Uploader from '@/components/Uploader.vue'
import axios from 'axios'
import {  Loading, Check, Close } from '@element-plus/icons'

jest.mock('axios')
const MockedAxios = axios as jest.Mocked<typeof axios>

let wrapper: VueWrapper<any>
describe('test the uploader component', () => {

  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: {
        uploadUrl: 'test.url'
      },
      slots: {
        uploading: `<div class="uploading"><span>custom uploading</span></div>`,
        uploadBefore: `<div class="before-upload"><span>custom before uploading</span></div>`,
        uploaded: `<template v-slot:uploaded="slotProps">
        <div class="uploaded">
          <span>{{ slotProps.data.status }}</span>
        </div></template>`
      },
      global: {
        stubs: {
          Loading,
          Check,
          Close
        }
      }
    })
  })

  it('the initial markup of the component', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('button span').text()).toBe('custom before uploading')
    expect(wrapper.find('input.file-uploader').exists()).toBeTruthy()
    expect(wrapper.get('input.file-uploader').isVisible()).toBeFalsy()
  })

  it('trigger click and upload file', async () => {
    const file = new File(['uploader'], 'test.png', { type: 'image/png' })
    const input = wrapper.get('input').element
    const files = [file]
    Object.defineProperty(input, 'files', {
      value: files,
    })

    MockedAxios.post.mockResolvedValueOnce({ status: 'success' })
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('button').text()).toBe('custom uploading')
    await flushPromises()
    expect(MockedAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').text()).toBe('success')
    expect(wrapper.findAll('li').length).toBe(1)

    MockedAxios.post.mockResolvedValueOnce({ status: 'success' })
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('button').text()).toBe('custom uploading')
    expect(MockedAxios.post).toHaveBeenCalledTimes(2)
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('success')
    expect(wrapper.findAll('li').length).toBe(2)


    MockedAxios.post.mockRejectedValueOnce({ status: 'fail' })
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('button').text()).toBe('custom uploading')
    expect(MockedAxios.post).toHaveBeenCalledTimes(3)
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('custom before uploading')
    expect(wrapper.findAll('li').length).toBe(3)
  })


})
