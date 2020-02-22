<template>
  <div class="sidenav">
      <div class="modal-body">
        <textarea class="input-text" v-model="todo.comment" rows="3" :readonly="readonly" :class="{'readonly': readonly}" />
      </div>
      <div class="modal-body">
        <textarea class="note" v-model="todo.note" maxlength="2000" rows="15" :readonly="readonly" :class="{'readonly': readonly}"/>
      </div>

      <div class="modal-footer">
        <button class="btn-regular modal-default-button" @click="update" :disabled="readonly">OK</button>
        <button class="btn-gray modal-default-button" @click="cancel">キャンセル</button>
        <label>
          <input type="checkbox" v-model="readonly" :disabled="!canEdit" />
          <span>Readonly</span>
        </label>
      </div>
  </div>
</template>

<script>
import { TaskState } from '@/util/TaskState'
import { Todo } from '@/util/Todo'
import { Type } from '@/store/mutation-types'

export default {
  name: 'SideView',
  data() {
    return {
      todo: Todo,
      options: Object.values(TaskState),
      readonly: true,
      canEdit: false
    };
  },
  methods: {
    update: function() {
      if (this.readonly) return
      this.canEdit = false

      if (this.todo !== null && this.todo.id !== null) {
        // commentの改行コードを削除
        this.todo.comment = this.todo.comment.replace(/\r?\n/g,'')
        this.$store.dispatch(Type.UPDATE_TASK, this.todo)
      }
    },
    cancel: function() {
      this.canEdit = false

      this.todo = new Todo()
      this.$store.dispatch(Type.EDIT_MODE, {id: null, editing: false})
    }
  },
  computed: {
    editingValue() {
      return this.$store.getters.getEditingValue
    }
  },
  watch: {
    // eslint-disable-next-line
    editingValue(newVal, oldVal) {
      if (newVal !== null) {
        console.log('start:' + newVal.id)
        this.todo = newVal
        this.canEdit = true
        this.$emit('toggle', true)
      } else {
        console.log('end')
        this.todo = new Todo()
        this.canEdit = false
        this.readonly = true
        this.$emit('toggle', false)
      }
    }
  }
}
</script>

<style scoped>

.sidenav {
  margin: 30px auto 0;
  padding: 20px 10px;
  background-color: #fff;
}

.radio-label {
  font-weight: bold;
}

.modal-body {
  margin: 10px 0;
}

.modal-footer {
  margin: 5px 0;
  height: 20px;
}

.input-text {
  width: 100%;
  line-height: 1.5;
  font-size: 14px;
  resize: none;
}

.note {
  width: 100%;
  resize: vertical;
  padding: 5px 0;
  font-size: 14px;
  line-height: 1.5;
}

.modal-default-button {
  margin-left: 10px;
  float: right;
}

.modal-default-button[disabled="disabled"] {
  opacity: 0.3;
}

.status-label span {
  margin: 0 5px;
}

.status-labels {
  display: flex;
  justify-content: space-evenly;
}

.readonly {
  background-color: #5f5f5f3b;
  resize: none;
}
</style>
