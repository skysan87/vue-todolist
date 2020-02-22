<template>
<div>
  <div class="flex-container">
    <div class="move-icon">
      <font-awesome-icon icon="ellipsis-v" size="xs"/>
    </div>
    <div class=""  @click="changeEventHandler">
      <span class="circle-button pointer" v-bind:class="badgeColor(todo.state)"></span>
    </div>
    <div class="flex-grow-1 no-wrap todo-text" v-bind:title="todo.comment">
      {{ todo.comment }}
    </div>
    <div class="" @click="editEventHandler">
      <font-awesome-icon icon="edit" size="xs" class="pointer"/>
    </div>
    <transition name="slide-fade">
      <div class="" @click="removeEventHandler" v-show="canRemove">
        <span class="pointer">×</span>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import { getStateColor } from '@/util/StateColor'

export default {
  name: 'TodoItem',
  props: {
    todo: Object
  },
  data () {
    return {
    }
  },
  methods: {
    changeEventHandler: function () {
      this.$emit('changeState', this.todo.id)
    },
    badgeColor: function (state) {
      return getStateColor(state)
    },
    editEventHandler: function () {
      this.$emit('edit', this.todo.id)
    },
    removeEventHandler: function () {
      this.$emit('remove', this.todo.id)
    }
  },
  computed: {
    canRemove () {
      return this.$store.getters.getCanRemove
    }
  }
}
</script>

<style>
@import '../assets/common.css';

.flex-container {
  width: 100%;
  display: flex;
}

.flex-container div {
  padding: .25rem;
}

.move-icon {
  cursor: move;
}

.todo-text {
  text-align: left;
}

.pointer {
  cursor: pointer;
}

.no-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* transition:slide-face */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
