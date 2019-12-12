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
    lastUid: 0
  },
  getters: {
    // NOTE:引数あり=メソッドスタイルアクセスの場合、キャッシュされない
    getFilteredTodos: (state) => (selectedState, isAllSelected) => {
      return getFilteredArray(state.todos, selectedState, isAllSelected)
    },
    getTodoById: (state) => (id) => {
      let index = state.todos.findIndex(v => v.id === id)
      return state.todos[index]
    },
    getTaskCount: (state) => (taskState) => {
      return state.todos.filter(el => {
        return taskState === -1 ? true : el.state === taskState
      }).length
    }
  },
  // 状態の更新
  mutations: {
    [Type.ADD_TASK] (state, payload) {
      if (state.todos.length > 0) {
        state.lastUid = state.todos.reduce((a,b) => a.id > b.id ? a : b).id
      }
      let todo = new Todo(state.lastUid + 1, payload.data, TaskState.Todo.value)
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
      state.todos[index] = payload.data
      Storage.save(state.todos)
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
    }
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
      let filtered = context.getters.getFilteredTodos(params.option, params.isAllSelected)
      let origin = filtered[params.oldIndex]
      let dest = filtered[params.newIndex]
      context.commit(Type.CHANGE_ORDER, {src: origin, dest: dest})
    },
    [Type.DELETE_DONE] ({ commit }) {
      commit(Type.DELETE_DONE)
    }
  }
})

// TODO:並び替え