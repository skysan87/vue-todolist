<template>
  <div class="container">

    <div class="main-content">
      <div class="list-group">
        <draggable v-model="filteredTodos" @end="onDragEnd"
                  handle=".move-icon">
          <todo-item class="list-group-item"
            v-for="item in filteredTodos"
            :key="item.id"
            :todo="item"
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
import TodoItem from './TodoItem.vue'
import ModalDialog from './ModalDialog.vue'
import { Type } from '@/store/mutation-types'

export default {
  name: 'TodoList',
  components: {
    draggable, TodoItem, ModalDialog
  },
  data () {
    return {
      isModal: false,
      editingItem: null
    }
  },
  methods: {
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
      if (this.$isMobile()) {
        this.isModal = true
        this.editingItem = this.$store.getters.getTodoById(id)
      } else {
        // サイドメニューに表示
        this.$store.dispatch(Type.EDIT_MODE, {id: id, editing: true})
      }
    },
    /**
     * モーダルを閉じる
     */
    closeModal: function() {
      this.isModal = false
      this.editingItem = null
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
    }
  },
  computed: {
    filteredTodos:{
      get() {
        // return this.$store.getters.getFilteredTodos(this.filterOption, this.isAllSelected)
        return this.$store.getters.getFilteredTodos
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
  padding: 0;
  margin: 0 auto;
}

.main-content {
  padding-top: 10px;
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

</style>
