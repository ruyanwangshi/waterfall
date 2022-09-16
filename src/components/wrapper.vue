<script setup lang="ts">
import { onBeforeUnmount, toRefs, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    bottomSize?: string | number
  }>(),
  {
    bottomSize: 300,
  }
)

const emit = defineEmits<{
  (e: 'load'): void
}>()

let lock = false

const { bottomSize } = toRefs(props)

window.addEventListener('scroll', scroll)

function scroll(e: Event) {
  const pageEl = document.documentElement || document.body
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const bottom = scrollHeight - windowHeight - pageEl.scrollTop
  if (bottomSize.value > bottom && !lock) {
    lock = true
    emit('load')
  }
  if(bottomSize.value < bottom && lock) {
    lock = false
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scroll)
})

nextTick(() => {
  console.log('执行了')
})
</script>

<template>
  <div>
    <slot></slot>
    <div class="bottom_nail"></div>
  </div>
</template>

<style lang="scss" scoped></style>
