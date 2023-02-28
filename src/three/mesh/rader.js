import * as THREE from "three"
import gsap from "gsap"
import vertexShader from "@/shaders/Radar/vertex.glsl"
import fragmentShader from "@/shaders/Radar/fragment.glsl"
export default class Radar {
  constructor(radius = 2, position = { x: 0, y: 0 }, color = 0xff0000) {
    this.geometry = new THREE.PlaneGeometry(radius, radius, 32, 32)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.position.set(position.x, 1, position.z)
    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: "none",
    })
  }
  remove () {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}
