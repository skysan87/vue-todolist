<template>
  <div>
    <side-view
      v-if="!$isMobile()"
      class="side-view"
      @toggle="onToggle"
      :class="{'side-view--popup': popup}"
    />
    <div class="main-view">
      <header-View :class="fixtopType" />
      <div :class="contentsType">
        <todo-list />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue'
import SideView from './SideView.vue'
import TodoList from './TodoList.vue'
import { Type } from '@/store/mutation-types'

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
    },
    onKeyDown(ev) {
      if (ev.keyCode === 27 /* Escape */) {
        this.cancelEditMode();
      }
    },
    cancelEditMode() {
      const target = document.activeElement;
      switch (target.tagName) {
        case 'INPUT': {
          const attribute = target.getAttribute('type');
          if (attribute !== 'text') {
            this.$store.dispatch(Type.EDIT_MODE, {id: null, editing: false})
          }
          break;
        }
        case 'TEXTAREA': {
          break;
        }
        default: {
          this.$store.dispatch(Type.EDIT_MODE, {id: null, editing: false})
          break;
        }
      }
    }
  },
  computed: {
    contentsType: function() {
      return this.$isMobile() ? 'contents-box__mobile' : 'contents-box'
    },
    fixtopType: function() {
      return this.$isMobile() ? 'fix-top__mobile' : 'fix-top'
    }
  },
  created() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
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

.fix-top__mobile {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
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

.contents-box__mobile {
  width: 100%;
  padding: 0;
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
