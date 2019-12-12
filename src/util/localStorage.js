const STORAGE_KEY = 'vue-todolist'

export default class Storage {
  static fetch () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo) => {
      todo["note"] = todo.note || ""
    })
    return todos
  }

  static save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
