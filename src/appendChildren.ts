import { ref } from 'vue'
const view = ref<any[]>([])
let index = 0
let heightList: number[] = []
let code = '.item-column'

export function initOptions(domName?: string, columns: number = 2) {
  if (domName) {
    code = domName
  }
  for (let i = 0; i < columns; i++) {
    heightList.push(0)
    view.value.push(0)
  }
}

function initImgsCpn(imgs: any[], domRenderHandler: (imgs: any[]) => void) {
  const imgList = Promise.all(imgs.map((item) => createImg(item)))
  imgList.then((imgs) => {
    imgs.forEach((img) => checkImgHeight(img))
    domRenderHandler(imgs)
  })
}

function checkImgHeight(item: HTMLDivElement) {
  const columnDom = document.querySelectorAll(code)
  console.log('columnDom=>', columnDom, index, heightList)
  columnDom[index].appendChild(item)
  const height = (item.firstChild as HTMLImageElement).height
  console.dir(item)
  heightList[index] = height + heightList[index]

  const minHeight = Math.min(...heightList)
  index = heightList.findIndex((item) => minHeight === item)
}

function createImg(item: string): Promise<HTMLDivElement> {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    const div = document.createElement('div')
    div.classList.add('img-item')
    div.appendChild(img)
    img.src = item
    img.addEventListener('load', () => {
      resolve(div)
    })
    img.addEventListener('error', () => {
      img.src = ''
    })
  })
}

export default initImgsCpn
