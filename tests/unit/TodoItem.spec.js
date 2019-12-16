import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'
import { Todo } from  '@/util/Todo'
import { TaskState } from '@/util/TaskState'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

describe('TodoItem.vue', () => {
  describe(':props', () => {
    it('Todo表示', () => {
      const todo = new Todo(1, 'new task', TaskState.Todo.value , 'detail');
      const wrapper = shallowMount(TodoItem, {
        propsData: {
          todo: todo,
          canRemove: false
         }
      })
      expect(wrapper.find(".todo-text").text()).toBe('new task')
      expect(wrapper.find(".todo-x-pointer").isVisible()).toBe(false)
      expect(wrapper.contains(".badge-light")).toBe(true)
    })
  })
})