<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import * as THREE from "three"
import scene from "@/three/scene"
import camera from "@/three/camera"
import renderer from "@/three/renderer"
import '@/three/init'
import animate from "@/three/animate"
import createMesh from "@/three/createMesh"
import AlarmSprite from "@/three/mesh/AddSprite"
import LightWall from "@/three/mesh/LightWall"
import flyLineShader from '@/three/mesh/flyLineshader'
import Radar from "@/three/mesh/rader"
import eventBus from '@/utils/eventBus'
import controls from "@/three/controls"
// 获取Props
const props = defineProps(['eventList'])

//场景元素div
let sceneDiv = ref(null)

scene.add(camera)


createMesh()
onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement)

  animate()
})

const MeshList = []

let mapFn = {
  "火警": (position,index) => {
    const lightWall = new LightWall(1, 2, position)
    scene.add(lightWall.mesh)
    lightWall.eventListIndex = index
    MeshList.push(lightWall)
  },
  "治安": (position,index) => {
    // 随机的颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    )
    const LineShader = new flyLineShader(position, color)
    scene.add(LineShader.mesh)
    LineShader.eventListIndex = index
    MeshList.push(LineShader)
  },
  "电力": (position,index) => {
    // 随机的颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    )
    const radar = new Radar(2, position, color)
    scene.add(radar.mesh)
    radar.eventListIndex = index
    MeshList.push(radar)
  }
}


watch(() => props.eventList, (newValue, oldValue) => {
  MeshList.forEach((item) => item.remove())
  newValue.forEach((element, index) => {
    const position = {
      x: element.position.x / 5 - 10,
      z: element.position.y / 5 - 10
    }
    const alarmSprite = new AlarmSprite(element.name, position)
    alarmSprite.onClick(() => {
      eventBus.emit('spriteClick', { event: element, index })
    })
    alarmSprite.eventListIndex = index
    MeshList.push(alarmSprite)
    scene.add(alarmSprite.mesh)
    if (mapFn[element.name]) {
      mapFn[element.name](position,index)
    }
  })
})

/* 监听切换事件 */
eventBus.on('toggle', (value) => {
  MeshList.forEach((item,index)=>{
    if(item.eventListIndex != value){
      item.mesh.visible = false
    }else{
      item.mesh.visible = true
    }
    const position ={
      x:props.eventList[value].position.x /5 -10,
      y:0,
      z:props.eventList[value].position.y /5 -10,
    }
    controls.target.set(position.x,position.y,position.z)
  })
})
eventBus.on('reset',()=>{
  controls.reset()
})
</script>

<style scoped>
.scene {
  height: 100%;
  width: 100%;
}
</style>