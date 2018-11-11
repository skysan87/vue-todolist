const STORAGE_KEY = 'vue-todolist'

export default class Storage {
  static fetch () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    return todos
  }

  static save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
