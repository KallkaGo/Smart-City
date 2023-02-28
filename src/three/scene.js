import * as THREE from 'three'

/*
* Scene
* */
const scene = new THREE.Scene()

const textureLoader = new THREE.CubeTextureLoader()
const texture = textureLoader.load([
  '/textures/1.jpg',
  '/textures/2.jpg',
  '/textures/3.jpg',
  '/textures/4.jpg',
  '/textures/5.jpg',
  '/textures/6.jpg',
])
scene.background = texture
// scene.environment = texture
/* 
二者的区别是
场景的背景和环境贴图都是用来美化场景的技术，
但它们的作用和效果是不同的。
背景主要用来填充场景中未被物体填充的区域，
而环境贴图则主要用来模拟环境光照，增加场景中物体的真实感
*/

export default scene