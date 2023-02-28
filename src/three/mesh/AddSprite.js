import * as THREE from 'three'
import camera from '../camera'
export default class AlarmSprite {
  constructor(name = '火警', position = { x: -1.8, z: 3 }, color = 0xffff00) {
    this.cbList = []
    this.loader = new THREE.TextureLoader()
    const textureObj = {
      "火警": '/textures/tag/fire.png',
      "治安": '/textures/tag/jingcha.png',
      "电力": "/textures/tag/e.png"

    }
    const map = this.loader.load(textureObj[name])
    this.material = new THREE.SpriteMaterial({
      map: map, color,
      
    })
    this.mesh = new THREE.Sprite(this.material)
    //设置位置
    this.mesh.position.set(position.x, 3.5, position.z)

    // 创建射线
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    window.addEventListener('click', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
      this.raycaster.setFromCamera(this.mouse, camera)
      const intersects = this.raycaster.intersectObject(this.mesh)
      if (intersects.length > 0) {
        this.cbList.forEach((item) => item(e))
      }

    })

  }
  onClick (fn) {
    this.cbList.push(fn)
  }
  remove () {

    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}