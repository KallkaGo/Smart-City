import * as THREE from "three"
import gsap from "gsap"
import vertexShader from "@/shaders/lightWall/vertex.glsl"
import fragmentShader from "@/shaders/lightWall/fragment.glsl"
export default class LightWall {
  constructor(radius = 2,length =2,position={x:0,z:0},color=0xffff00) {
    this.geometry = new THREE.CylinderGeometry(radius, radius, 2, 32, 1, true)
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(position.x, 1, position.z)
    this.mesh.geometry.computeBoundingBox()
    const { min, max } = this.mesh.geometry.boundingBox
    let uHeight = max.y - min.y
    this.material.uniforms.uHeight = { value: uHeight }
    gsap.to(this.mesh.scale, {
      duration: 2,
      x: length, 
      z: length,
      repeat: -1,
      ease: "none",
      yoyo: true,
    })
  }
  remove(){
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}
