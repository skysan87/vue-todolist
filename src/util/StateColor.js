import { TaskState } from './TaskState'

export function getStateColor (state) {
  switch (state) {
    case TaskState.Todo.val:
      return 'badge-light circle-button-border'
    case TaskState.InProgress.val:
      return 'badge-warning'
    case TaskState.Done.val:
      return 'badge-success'
    default:
      return 'badge-info'
  }
}
