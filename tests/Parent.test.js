import { mount } from '@vue/test-utils'
import Parent from './Parent'

test('mount',()=>{
  const wrapper = mount(Parent)
  expect(wrapper.html()).toBe('')
})