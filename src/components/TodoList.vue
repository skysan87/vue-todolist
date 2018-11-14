<template>
  <div class="container">

    <!-- 登録フォーム -->
    <form class="fixed-top add-form center-block" style="padding-top: 20px; margin: 0 50px;" @submit.prevent="doAdd">
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="comment">Todo</label>
        </div>
        <input type="text" class="form-control" id="comment" ref="comment">
        <div class="input-group-prepend">
          <button type="submit" class="btn btn-primary">OK</button>
        </div>
      </div>
    </form>

    <div>
      <label class="p-2" v-for="viewOp in options" v-bind:key="viewOp.value" >
        <input type="radio" v-model="filterOption" v-bind:value="viewOp.value">
        <span>{{ viewOp.label }}</span>
        <span class="badge" v-bind:class="badgeColor(viewOp.value)">
          {{ todoCounts(viewOp.value) }}
        </span>
      </label>
    </div>

    <div class="list-group">
      <draggable v-model="filteredTodos" @end="onDragEnd"
                 v-bind:options="{handle:'.move-icon'}">
        <todo-item class="list-group-item list-group-item-action list-style"
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
import StateColor from '../util/StateColor'
import TodoItem from './TodoItem.vue'

/**
 * フィルターしたTodoを取得
 */
function getFilterdTodos (array, state) {
  if (state !== -1) {
    return array.filter(el => {
      return el.state === state
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
        { value: -1, label: 'All' },
        { value: 0, label: 'Todo' },
        { value: 1, label: 'In Progress' },
        { value: 2, label: 'Done' }
      ],
      filterOption: -1, // all
      isModal: false,
      editingItem: null
    }
  },
  methods: {
    /**
     * todoを追加する
     */
    doAdd: function (event, value) {
      let comment = this.$refs.comment
      if (!comment.value.length) return

      if (this.isModal && this.editingItem !== null) {
        this.editingItem.comment = comment.value
        this.editingItem = null
        this.isModal = false
      } else {
        this.todos.push({
          id: this.lastUid++,
          comment: comment.value,
          state: 0
        })
      }
      comment.value = ''
    },
    /**
     * ステータスを変更する
     */
    doChangeState: function (id) {
      let item = findbyId(this.todos, id)
      switch (item.state) {
        case 0:
          item.state = 1
          break
        case 1:
          item.state = 2
          break
        case 2:
          item.state = 0
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
      return StateColor.getColor(state)
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
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        Storage.save(todos)
        this.filteredTodos = getFilterdTodos(this.todos, this.filterOption)
      },
      deep: true
    },
    filterOption: function (newValue) {
      this.filteredTodos = getFilterdTodos(this.todos, newValue)
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

div.list-style {
  padding: 0.25rem 0.5rem;
  background-color: #faf9f9;
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
