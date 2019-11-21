<template>
  <div class="container">

    <div class="fix-top">
      <!-- 登録フォーム -->
      <form class="input-form" @submit.prevent="doAdd">
        <label class="form-label" for="comment">Todo</label>
        <input class="input-comment flex-grow-1" type="text" id="comment" ref="comment">
        <button type="submit" class="btn-regular">OK</button>
      </form>

      <div class="status-boxes">
        <label class="p-2">
          <input type="checkbox" :checked="isAllSelected" @click="selectAll">
          <span class="status-label">All</span>
          <span class="badge" v-bind:class="badgeColor(-1)">
            {{ todoCounts(-1) }}
          </span>
        </label>
        <label class="p-2" v-for="viewOp in options" v-bind:key="viewOp.value" >
          <input type="checkbox" v-model="filterOption" v-bind:value="viewOp.value">
          <span class="status-label">{{ viewOp.label }}</span>
          <span class="badge" v-bind:class="badgeColor(viewOp.value)">
            {{ todoCounts(viewOp.value) }}
          </span>
        </label>
        <button class="btn-red" @click="deleteDone">Clear Done</button>
      </div>
    </div>

    <div class="main-content">
      <div class="list-group">
        <draggable v-model="filteredTodos" @end="onDragEnd"
                  handle=".move-icon">
          <todo-item class="list-group-item list-style"
            v-for="item in filteredTodos"
            v-bind:key="item.id"
            v-bind:id="item.id"
            v-bind:comment="item.comment"
            v-bind:state="item.state"
            @changeState="doChangeState"
            @edit="editComment"
            @remove="doRemove"></todo-item>
        </draggable>
      </div>
    </div>

    <!-- 編集中のオーバーレイ -->
    <transition name="modal" v-if="isModal">
      <div class="overlay" @click="cancelEdit()">
      </div>
    </transition>

  </div>
</template>

<script>
import Storage from '../util/localStorage'
import draggable from 'vuedraggable'
import { getStateColor } from '../util/StateColor'
import TodoItem from './TodoItem.vue'
import { Todo } from '../util/Todo'
import { TaskState } from '../util/TaskState'

/**
 * フィルターしたTodoを取得
 */
function getFilterdTodos (array, state, isAllSelected) {
  if (isAllSelected === false) {
    return array.filter(el => {
      return state.includes(el.state)
    })
  } else {
    return array.concat()
  }
}

function findbyId (array, id) {
  let index = array.findIndex(v => v.id === id)
  return array[index]
}

export default {
  name: 'TodoList',
  components: {
    draggable, TodoItem
  },
  data () {
    return {
      todos: [],
      filteredTodos: [],
      lastUid: 0,
      options: [
        { value: TaskState.Todo.val, label: 'Todo' },
        { value: TaskState.InProgress.val, label: 'In Progress' },
        { value: TaskState.Done.val, label: 'Done' }
      ],
      filterOption: [TaskState.Todo.val, TaskState.InProgress.val], //初期表示
      isAllSelected: false,
      isModal: false,
      editingItem: null
    }
  },
  methods: {
    /**
     * todoを追加する
     */
    // eslint-disable-next-line
    doAdd: function (event, value) {
      let comment = this.$refs.comment
      if (!comment.value.length) return

      if (this.isModal && this.editingItem !== null) {
        this.editingItem.comment = comment.value
        this.editingItem = null
        this.isModal = false
      } else {
        let todo = new Todo(this.lastUid++, comment.value, 0)
        this.todos.push(todo)
      }
      comment.value = ''
    },
    /**
     * ステータスを変更する
     */
    doChangeState: function (id) {
      let item = findbyId(this.todos, id)
      switch (item.state) {
        case TaskState.Todo.val:
          item.state = TaskState.InProgress.val
          break
        case TaskState.InProgress.val:
          item.state = TaskState.Done.val
          break
        case TaskState.Done.val:
          item.state = TaskState.Todo.val
          break
      }
    },
    /**
     * 削除
     */
    doRemove: function (id) {
      let index = this.todos.findIndex(v => v.id === id)
      this.todos.splice(index, 1)
    },
    /**
     * コメント編集
     */
    editComment: function (id) {
      this.isModal = true
      let comment = this.$refs.comment
      let item = findbyId(this.todos, id)
      comment.value = item.comment
      comment.focus()
      this.editingItem = item
    },
    /**
     * 編集キャンセル
     */
    cancelEdit: function () {
      this.isModal = false
      let comment = this.$refs.comment
      comment.value = ''
      this.editingItem = null
    },
    /**
     * 各ステータスのタスク数
     */
    todoCounts: function (state) {
      return this.todos.filter(el => {
        return state === -1 ? true : el.state === state
      }).length
    },
    /**
     * ステータスの色
     */
    badgeColor: function (state) {
      return getStateColor(state)
    },
    /**
     * ドラッグ終了時
     */
    onDragEnd: function (ev) {
      // filteredTodosはすでに並び替えられている
      let offset = 0
      if (ev.oldIndex < ev.newIndex) {
        offset = -1 // top to bottom
      } else if (ev.oldIndex > ev.newIndex) {
        offset = 1 // bottom to top
      } else {
        return
      }
      let origin = this.filteredTodos[ev.newIndex]
      let originalIndex = this.todos.indexOf(origin)
      let dest = this.filteredTodos[ev.newIndex + offset]
      let destIndex = this.todos.indexOf(dest)
      this.todos.splice(originalIndex, 1) // remove
      this.todos.splice(destIndex, 0, origin) // insert
    },
    /**
     * すべて表示
     */
    selectAll: function () {
      if (this.isAllSelected) {
        this.filterOption = []
        this.isAllSelected = false
      } else {
        this.filterOption = []
        this.options.forEach(op =>
          this.filterOption.push(op.value)
        )
        this.isAllSelected = true
      }
    },
    /**
     * 完了済みのタスクを削除
     */
    deleteDone: function() {
      let options = [TaskState.Todo.val, TaskState.InProgress.val]
      this.todos = getFilterdTodos(this.todos, options, false)
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        Storage.save(todos)
        this.filteredTodos = getFilterdTodos(this.todos, this.filterOption, this.isAllSelected)
      },
      deep: true
    },
    filterOption: function (newValue) {
      this.isAllSelected = newValue.length ===  this.options.length
      this.filteredTodos = getFilterdTodos(this.todos, newValue, this.isAllSelected)
    }
  },
  created () {
    this.todos = Storage.fetch()
    this.filteredTodos = this.todos.concat()
    this.lastUid = this.todos.length
  },
  computed: {
    labels () {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  }
}
</script>

<style scoped>
@import '../assets/common.css';

.container {
  width: 100%;
  max-width: 720px;
  padding: 0 15px;
  margin: 0 auto;
}

.fix-top {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  padding: 0 15px;
  height: 100px;
  text-align: center;
  background: white;
  z-index: 9999;
}

.input-form {
  display: flex;
  width: 100%;
  padding: 15px 15px 5px 15px;
  max-width: 720px;
  margin: 0 auto;
}

.form-label {
  display: flex;
  font-size: 1rem;
  border: 1px solid #979797;
  background: #faf9f9;
  line-height: 1.5;
  padding: .25rem .5rem;
  text-align: center;
  vertical-align: baseline;
}

.input-comment {
  font-size: 1rem;
}

.main-content {
  padding-top: 100px;
}

div.list-style {
  padding: 0.25rem 0.5rem;
  background-color: #faf9f9;
}

.badge {
  display: inline-block;
  padding: 2px 5px;
  text-align: center;
  border-radius: .25rem;
  vertical-align: baseline;
  font-size: 75%;
  white-space: nowrap;
  font-weight: bold;
}

.status-boxes {
  display: flex;
  justify-content: center;
}

.status-boxes label {
  padding: .5rem;
}

/* ステータスラベル */
.status-label {
  margin: 0 5px;
}

.list-group {
  border-left: 1px solid #979797;
  border-bottom: 1px solid #979797;
  border-right: 1px solid #979797;
}

.list-group-item {
  border-top: 1px solid #979797;
}

/* ドラッグするアイテム */
.sortable-chosen {
  opacity: 0.3;
}

.sortable-ghost {
  background-color:#979797;
}

/* モーダル */
.overlay {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
