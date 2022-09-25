<script setup lang="ts">
import { ref, h, TransitionGroup } from 'vue'
import initImgsCpn, { initOptions } from './appendChildren'
import Wrapper from './components/wrapper.vue'
let imgs: string[] = []
let heightArray: number[] = []
const viewData = ref<Array<string[]>>([])
const columns = 2
let currentIndex = 0 // 添加数据量
let i = 0 // 添加队列指针
let initLock = false

for (let i = 0; i < columns; i++) {
  viewData.value.push([])
  heightArray.push(0)
}

const http = 'http://192.168.1.104:3001'

const api = 'getImgs'

initOptions()

initImgs()
function initImgs() {
  fetch(`${http}/${api}`)
    .then((res) => res.json())
    .then((res) => {
      const { success, result } = res
      if (success) {
        // console.log('执行了,', imgs)
        // imgs.push(...result)
        // setViewData(imgs)
        // console.time('foo')
        initImgsCpn(result, (img: any[]) => {
          initLock = false
        })
      }
    })
}


// async function load() {
//   const colmuns = document.querySelectorAll('.item-column')
//   const item = colmuns[i].lastElementChild

//   if (!item) {
//     return
//   }

//   const elHeight = item.clientHeight
//   heightArray[i] = elHeight + heightArray[i]
//   // 更改push队列坐标()
//   i = checkHeight()
//   // 当前数据是否加载完成
//   if (currentIndex === imgs.length) {
//     console.timeEnd('foo')
//     initLock = false
    
//     return
//   }
//   setViewData(imgs)
// }

// function setViewData(list: string[]) {
//   viewData.value[i].push(list[currentIndex++])
// }

// function checkHeight() {
//   const minHeight = Math.min(...heightArray)
//   const nextIndex = heightArray.findIndex((item) => minHeight === item)
//   return nextIndex
// }

function initData() {
  if (!initLock) {
    initLock = true
    initImgs()
  }

  // initImgs()
}
</script>

<template>
  <Wrapper class="wrapper" @load="initData">
    <transition-group name="list" tag="div" class="item-column" v-for="(columnItem, index) in viewData" :key="index">
      <!-- <div class="img-item" v-for="(item, indey) in columnItem" :key="indey">
        <img :src="item" alt="" @load="load" />
      </div> -->
    </transition-group>
  </Wrapper>
</template>

<style lang="scss">
.wrapper {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .item-column {
    flex: 1;
    overflow: hidden;
  }
  .img-item {
    padding: 4px;
    box-sizing: border-box;
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
    }
  }
}
</style>
