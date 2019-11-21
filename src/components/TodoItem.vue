<template>
<div>
  <div class="flex-container">
    <div class="move-icon">
      <font-awesome-icon icon="ellipsis-v" size="xs"/>
    </div>
    <div class=""  @click="changeEventHandler">
      <span class="circle-button pointer" v-bind:class="badgeColor(state)"></span>
    </div>
    <div class="flex-geow-1 no-wrap todo-text" v-bind:title="comment">
      {{ comment }}
    </div>
    <div class="" @click="editEventHandler">
      <font-awesome-icon icon="edit" size="xs" class="pointer"/>
    </div>
    <div class="" @click="removeEventHandler">
      <span class="pointer">×</span>
    </div>
  </div>
</div>
</template>

<script>
import { getStateColor } from '../util/StateColor'

export default {
  name: 'todo-item',
  props: {
    id: Number,
    comment: String,
    state: Number
  },
  data () {
    return {
    }
  },
  methods: {
    changeEventHandler: function () {
      this.$emit('changeState', this.id)
    },
    badgeColor: function (state) {
      return getStateColor(state)
    },
    editEventHandler: function () {
      this.$emit('edit', this.id)
    },
    removeEventHandler: function () {
      this.$emit('remove', this.id)
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

.flex-geow-1 {
  flex-grow: 1;
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

</style>
