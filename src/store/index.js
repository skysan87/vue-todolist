import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '@/util/localStorage'
import { Todo } from '@/util/Todo'
import { TaskState } from '@/util/TaskState'
import { Type } from './mutation-types'

Vue.use(Vuex)

function getFilteredArray(array, option, isAllSelected) {
  if (isAllSelected === false) {
    return array.filter(el => {
      return option.includes(el.state)
    })
  } else {
    return array.concat() //new array
  }
}

export default new Vuex.Store({
  state: {
    todos: Storage.fetch(),
    selectedState: [TaskState.Todo.value, TaskState.InProgress.value],
    lastUid: 0,
    canRemove: false,
    editingTodo: null
  },
  getters: {
    // NOTE:引数あり=メソッドスタイルアクセスの場合、キャッシュされない
    // getFilteredTodos: (state) => (selectedState, isAllSelected) => {
    //   return getFilteredArray(state.todos, selectedState, isAllSelected)
    // },
    getFilteredTodos: (state) => {
      const selectedCount = state.selectedState.length
      const selectAll = Object.values(TaskState).length === selectedCount
      return getFilteredArray(
        state.todos,
        state.selectedState,
        selectAll
      )
    },
    getTodoById: (state) => (id) => {
      let index = state.todos.findIndex(v => v.id === id)
      return index >= 0 ? state.todos[index] : null
    },
    getTaskCount: (state) => (taskState) => {
      return state.todos.filter(el => {
        return taskState === -1 ? true : el.state === taskState
      }).length
    },
    getCanRemove: (state) => {
      return state.canRemove
    },
    getEditingValue: (state) => {
      return state.editingTodo
    },
    getSelectedState: (state) => {
      return state.selectedState
    }
  },
  // 状態の更新
  mutations: {
    [Type.ADD_TASK] (state, payload) {
      if (state.todos.length > 0) {
        state.lastUid = state.todos.reduce((a,b) => a.id > b.id ? a : b).id
      }
      const todo = new Todo()
      todo.id = state.lastUid + 1
      todo.comment = payload.data
      todo.state = TaskState.Todo.value

      state.todos.push(todo)
      Storage.save(state.todos)
    },
    [Type.REMOVE_TASK] (state, payload) {
      let index = state.todos.findIndex(v => v.id === payload.data)
      state.todos.splice(index, 1)
      Storage.save(state.todos)
    },
    [Type.CHANGE_STATE] (state, payload) {
      let index = state.todos.findIndex(v => v.id === payload.data)
      let item = state.todos[index]

      switch (item.state) {
        case TaskState.Todo.value:
          item.state = TaskState.InProgress.value
          break
        case TaskState.InProgress.value:
          item.state = TaskState.Done.value
          break
        case TaskState.Done.value:
          item.state = TaskState.Todo.value
          break
      }
      Storage.save(state.todos)
    },
    [Type.UPDATE_TASK] (state, payload) {
      let index = state.todos.findIndex(v => v.id === payload.data.id)
      if (index >= 0) {
        Object.assign(state.todos[index], payload.data)
        Storage.save(state.todos)
      }
      // 編集モード解除
      state.editingTodo = null
    },
    [Type.CHANGE_ORDER] (state, payload) {
      let srcIndex = state.todos.findIndex(v => v.id === payload.src.id)
      let destIndex = state.todos.findIndex(v => v.id === payload.dest.id)
      state.todos.splice(srcIndex, 1) // remove
      state.todos.splice(destIndex, 0, payload.src) // insert
      Storage.save(state.todos)
    },
    [Type.DELETE_DONE] (state) {
      let options = [TaskState.Todo.value, TaskState.InProgress.value]
      state.todos = getFilteredArray(state.todos, options, false)
      Storage.save(state.todos)
    },
    [Type.SWITCH_REMOVE_BTN] (state) {
      state.canRemove = !state.canRemove
    },
    [Type.EDIT_MODE] (state, payload) {
      if (payload !== null && payload.editing) {
        const index = state.todos.findIndex(v => v.id === payload.id)
        let todo = {}
        Object.assign(todo, state.todos[index]) //copy
        state.editingTodo = todo
      } else {
        state.editingTodo = null
      }
    },
    changeFilter(state, payload) {
      state.selectedState = payload.data
    },
  },
  // データの加工、非同期処理
  actions: {
    [Type.ADD_TASK] ({ commit }, title) {
      commit(Type.ADD_TASK, { data: title })
    },
    [Type.REMOVE_TASK] ({ commit }, id) {
      commit(Type.REMOVE_TASK, {data: id})
    },
    [Type.CHANGE_STATE] ({ commit }, id) {
      commit(Type.CHANGE_STATE, {data: id})
    },
    [Type.UPDATE_TASK] ({ commit }, todo) {
      commit(Type.UPDATE_TASK, {data: todo})
    },
    [Type.CHANGE_ORDER] (context, params) {
      let filtered = context.getters.getFilteredTodos
      let origin = filtered[params.oldIndex]
      let dest = filtered[params.newIndex]
      context.commit(Type.CHANGE_ORDER, {src: origin, dest: dest})
    },
    [Type.DELETE_DONE] ({ commit }) {
      commit(Type.DELETE_DONE)
    },
    [Type.SWITCH_REMOVE_BTN] ({ commit }) {
      commit(Type.SWITCH_REMOVE_BTN)
    },
    [Type.EDIT_MODE] ({ commit }, params) {
      commit(Type.EDIT_MODE, params)
    },
    changeFilter({ commit }, options) {
      commit('changeFilter', { data: options })
    }
  }
})

// TODO:並び替え