<script setup lang="ts">
import { onBeforeUnmount, toRefs } from 'vue'

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
  console.log('lock', lock)
  if (bottomSize.value > bottom && !lock) {
    lock = true
    emit('load')
  }
  if(bottomSize.value < bottom && lock) {
    lock = false
  }
  console.log(bottom)
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scroll)
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
