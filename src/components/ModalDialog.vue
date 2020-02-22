<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!-- フォーカスアウト防止 -->
          <div tabindex="0" class="dummy"></div>

          <div class="modal-body">
            <div class="status-labels">
              <label class="status-label" v-for="viewOp in options" v-bind:key="viewOp.value" >
                <input type="radio" v-model="state" v-bind:value="viewOp.value">
                <span class="">{{ viewOp.label }}</span>
              </label>
            </div>
          </div>

          <div class="modal-body">
            <input class="input-text" type="text" v-model="comment" ref="modalcomment" />
          </div>
          <div class="modal-body">
            <textarea v-model="note" maxlength="1000" rows="3"/>
          </div>

          <div class="modal-footer">
            <button class="btn-regular modal-default-button" @click="update">OK</button>
            <button class="btn-gray modal-default-button" @click="cancel">キャンセル</button>
          </div>

          <!-- フォーカスアウト防止 -->
          <div tabindex="0" class="dummy"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { TaskState } from '@/util/TaskState'
import { Type } from '@/store/mutation-types'

export default {
  name: "ModalDialog",
  props: {
    todo: Object
  },
  data() {
    return {
      comment: "",
      note: "",
      state: "",
      options: Object.values(TaskState)
    };
  },
  methods: {
    update: function() {
      this.todo["comment"] = this.comment;
      this.todo["note"] = this.note;
      this.todo["state"] = this.state;
      this.$store.dispatch(Type.UPDATE_TASK, this.todo)
      this.$emit("close");
    },
    cancel: function() {
      this.$emit("close");
    },
    checkFocus: function(ev) {
      if (ev.target !== null && ev.target.className == 'dummy') {
        this.$refs.modalcomment.focus();
      }
    }
  },
  created() {
    // モーダルが表示されるごとに呼ばれる
    this.comment = this.todo.comment
    this.note = this.todo.note || ""
    this.state = this.todo.state
    document.addEventListener("focusin", this.checkFocus, false);
  },
  mounted() {
    this.$refs.modalcomment.focus();
  },
  beforeDestroy() {
    document.removeEventListener("focusin", this.checkFocus, false);
  }
};
</script>

<style scoped>
@import "../assets/common.css";

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.1s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: top;
}

.modal-container {
  width: 500px;
  min-height: 150px;
  margin: 30px auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
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
}

textarea {
  width: 100%;
  resize: none;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1.5;
}

.modal-default-button {
  margin-left: 10px;
  float: right;
}

.status-label span {
  margin: 0 5px;
}

.status-labels {
  display: flex;
  justify-content: space-evenly;
}

/* transition="modal"に適用される */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>