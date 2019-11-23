<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
          </div>

          <div class="modal-body">
            <input class="input-text" type="text" v-model="comment" ref="modalcomment">
          </div>

          <div class="modal-footer">
            <button class="btn-regular modal-default-button" @click="update">
              OK
            </button>
            <button class="btn-gray modal-default-button" @click="cancel">
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'moda-dialog',
  props: {
    todo: Object,
  },
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    update: function() {
      this.todo.comment = this.comment
      this.$emit('close')
    },
    cancel: function() {
      this.$emit('close')
    }
  },
  created () {
    // モーダルが表示されるごとに呼ばれる
    this.comment = this.todo.comment
  },
  mounted () {
    this.$refs.modalcomment.focus();
  }
}
</script>

<style scoped>
@import '../assets/common.css';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .1s ease;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}

.input-text {
  width: 100%;
  line-height: 1.5;
}

.modal-default-button {
  margin-left: 10px;
  float: right;
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