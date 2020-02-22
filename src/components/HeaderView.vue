<template>
  <div class="header-container">
      <!-- 登録フォーム -->
      <form class="input-form" @submit.prevent="doAdd">
        <label class="form-label" for="comment">Todo</label>
        <input class="input-comment flex-grow-1" type="text" id="comment" ref="comment">
        <button type="submit" class="btn-regular">OK</button>
      </form>

      <div class="status-boxes">
        <label>
          <input type="checkbox" v-model="isAllSelected" @click="selectAll">
          <span class="status-label">All</span>
          <span class="badge" v-bind:class="badgeColor(-1)">
            {{ todoCounts(-1) }}
          </span>
        </label>
        <label v-for="viewOp in options" v-bind:key="viewOp.value" >
          <input type="checkbox" v-model="filterOption" :value="viewOp.value" @change="filterChanged">
          <span class="status-label">{{ viewOp.label }}</span>
          <span class="badge" v-bind:class="badgeColor(viewOp.value)">
            {{ todoCounts(viewOp.value) }}
          </span>
        </label>
        <button class="btn-red" @click="deleteDone">Clear Done</button>
        <button class="btn-switch-green" :class="{'switch-on': canRemove}" @click="switchRemoveButton">Edit</button>
      </div>
    </div>
</template>

<script>
import { TaskState } from '@/util/TaskState'
import { Type } from '@/store/mutation-types'
import { getStateColor } from '@/util/StateColor'

export default {
  name: 'HeaderView',
  data() {
    return {
      options: Object.values(TaskState),
      filterOption: this.$store.getters.getSelectedState,
      isAllSelected: false
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
     * すべて表示
     */
    selectAll: function () {
      if (this.isAllSelected) {
        this.filterOption = []
        this.options.forEach((op) => this.filterOption.push(op.value))
      } else {
        this.filterOption = []
      }
      this.$store.dispatch('changeFilter', this.filterOption)
    },
    filterChanged: function() {
      this.isAllSelected = this.options.length === this.filterOption.length
      this.$store.dispatch('changeFilter', this.filterOption)
    },
    /**
     * 完了済みのタスクを削除
     */
    deleteDone: function() {
      this.$store.dispatch(Type.DELETE_DONE)
    },
    switchRemoveButton: function() {
      this.$store.dispatch(Type.SWITCH_REMOVE_BTN)
    }
  },
  computed: {
    canRemove() {
        return this.$store.getters.getCanRemove
    }
  }
}
</script>

<style>
@import '../assets/common.css';

.header-container {
  padding: 0 15px;
  text-align: center;
  background: white;
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
