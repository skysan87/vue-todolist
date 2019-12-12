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
        <label>
          <input type="checkbox" :checked="isAllSelected" @click="selectAll">
          <span class="status-label">All</span>
          <span class="badge" v-bind:class="badgeColor(-1)">
            {{ todoCounts(-1) }}
          </span>
        </label>
        <label v-for="viewOp in options" v-bind:key="viewOp.value" >
          <input type="checkbox" v-model="filterOption" v-bind:value="viewOp.value">
          <span class="status-label">{{ viewOp.label }}</span>
          <span class="badge" v-bind:class="badgeColor(viewOp.value)">
            {{ todoCounts(viewOp.value) }}
          </span>
        </label>
        <button class="btn-red" @click="deleteDone">Clear Done</button>
        <button class="btn-switch-green" v-bind:class="{'switch-on': canRemove}" @click="canRemove = !canRemove">Edit</button>
      </div>
    </div>

    <div class="main-content">
      <div class="list-group">
        <draggable v-model="filteredTodos" @end="onDragEnd"
                  handle=".move-icon">
          <todo-item class="list-group-item list-style"
            v-for="item in filteredTodos"
            v-bind:key="item.id"
            v-bind:todo="item"
            v-bind:canRemove="canRemove"
            @changeState="doChangeState"
            @edit="editComment"
            @remove="doRemove"></todo-item>
        </draggable>
      </div>
    </div>

    <modal-dialog v-if="isModal"
      @close="closeModal"
      v-bind:todo="editingItem"
      ></modal-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { getStateColor } from '@/util/StateColor'
import TodoItem from './TodoItem.vue'
import ModalDialog from './ModalDialog.vue'
import { TaskState } from '@/util/TaskState'
import { Type } from '@/store/mutation-types'

export default {
  name: 'TodoList',
  components: {
    draggable, TodoItem, ModalDialog
  },
  data () {
    return {
      options: Object.values(TaskState),
      filterOption: [TaskState.Todo.value, TaskState.InProgress.value], //初期表示
      isAllSelected: false,
      isModal: false,
      editingItem: null,
      canRemove: false
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

      this.$store.dispatch(Type.ADD_TASK, comment.value)

      comment.value = ''
    },
    /**
     * ステータスを変更する
     */
    doChangeState: function (id) {
      this.$store.dispatch(Type.CHANGE_STATE, id)
    },
    /**
     * 削除
     */
    doRemove: function (id) {
      this.$store.dispatch(Type.REMOVE_TASK, id)
    },
    /**
     * コメント編集
     */
    editComment: function (id) {
      this.isModal = true
      this.editingItem = this.$store.getters.getTodoById(id)
    },
    /**
     * モーダルを閉じる
     */
    closeModal: function() {
      this.isModal = false
      this.editingItem = null
    },
    /**
     * 各ステータスのタスク数
     */
    todoCounts: function (state) {
      return this.$store.getters.getTaskCount(state)
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
      if (ev.oldIndex == ev.newIndex) {
        return
      }

      let params = {
        oldIndex: ev.oldIndex,
        newIndex: ev.newIndex,
        option: this.filterOption,
        isAllSelected: this.isAllSelected
      }
      this.$store.dispatch(Type.CHANGE_ORDER, params)
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
      this.$store.dispatch(Type.DELETE_DONE)
    }
  },
  watch: {
    filterOption: function (newValue) {
      this.isAllSelected = newValue.length ===  this.options.length
    }
  },
  computed: {
    filteredTodos:{
      get() {
        return this.$store.getters.getFilteredTodos(this.filterOption, this.isAllSelected)
      },
      // eslint-disable-next-line
      set(value) {
        // vuedraggable用
      }
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
  z-index: 999;
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

.main-content {
  padding-top: 100px;
}

.list-style {
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
  border-right: 1px solid #979797;
  margin: 0 15px;
}

.list-group-item:first-child {
  border-top: 1px solid #979797;
}

.list-group-item {
  border-bottom: 1px solid #979797;
}

/* ドラッグするアイテム */
.sortable-chosen {
  opacity: 0.3;
}

.sortable-ghost {
  background-color:#979797;
}

.btn-switch-green {
  color: green;
  border-color: green;
  margin: .25rem;
  padding: 2px 4px;
  outline: none;
}

.switch-on {
  color: #fff;
  background-color: green;
}

.btn-red {
  color: #dc3545;
  border-color: #dc3545;
  margin: .25rem;
  padding: 2px 4px;
  outline: none;
}

.btn-red:hover {
  color: #fff;
  background-color: #dc3545;
}
</style>
