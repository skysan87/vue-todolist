import { TaskState } from './TaskState'

export function getStateColor (state) {
  switch (state) {
    case TaskState.Todo.value:
      return 'badge-light circle-button-border'
    case TaskState.InProgress.value:
      return 'badge-warning'
    case TaskState.Done.value:
      return 'badge-success'
    default:
      return 'badge-info'
  }
}
