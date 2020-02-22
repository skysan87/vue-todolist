<template>
  <div>
    <side-view
      class="side-view"
      @toggle="onToggle"
      :class="{'side-view--popup': popup}"
    />
    <div class="main-view">
      <header-View class="fix-top" />
      <div class="contents-box">
        <todo-list />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue'
import SideView from './SideView.vue'
import TodoList from './TodoList.vue'

export default {
  name: 'MainForm',
  components: {
    HeaderView, SideView, TodoList
  },
  data() {
    return {
      popup: false
    }
  },
  methods: {
    onToggle(param) {
      if (param === true && window.innerWidth < 650) {
        this.popup = true
      } else {
        this.popup = false
      }
    }
  }
}
</script>

<style scoped>
.fix-top {
  top: 0;
  left: 0;
  position: fixed;
  width: calc(100% - 280px);
  height: 100px;
}

.main-view {
  padding-top: 100px;
}

.side-view {
  height: 100vh;
  width: 280px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #8f89e6;
  overflow-x: hidden;
}

.side-view--popup {
  display: block !important;
  z-index: 1;
  animation-name: RightToLeft;
  animation-duration: 0.5s;
}

.contents-box {
  width: calc(100% - 280px);
  padding: 0 20px;
}

@media screen and (max-width: 650px) {
  .side-view {
    display: none;
  }
  .contents-box {
    width: 100%;
    padding: 0;
  }
  .fix-top {
    width: 100%;
  }
}

@keyframes RightToLeft {
  0% {
    transform: translateX(280px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
