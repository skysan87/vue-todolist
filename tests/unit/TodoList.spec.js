import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TodoList from '@/components/TodoList.vue'
import TodoItem from '@/components/TodoItem.vue'
import store from '@/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TodoList.vue', () => {
  describe('@submit.prevent', () => {
    it('Todo入力時、TodoItemが生成される', () => {
      const wrapper = shallowMount(TodoList, {store, localVue});

      wrapper.find("#comment").setValue("new task")
      wrapper.find("form").trigger("submit.prevent")

      const todoItem = wrapper.find(TodoItem)
      expect(todoItem.is(TodoItem)).toBe(true)
    })
  })
})