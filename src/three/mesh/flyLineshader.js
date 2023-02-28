import * as THREE from "three"
import gsap from "gsap"
import vertexShader from "@/shaders/flyLine/vertex.glsl"
import fragmentShader from "@/shaders/flyLine/fragment.glsl"

export default class FlyLineShader {
  constructor(position = { x: 0, z: 0 }, color = 0x00ffff) {
    //根据点生成曲线
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(position.x / 2, 4, position.z / 2),
      new THREE.Vector3(position.x, 0, position.z),
    ]
    //   创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
    const ponits = this.lineCurve.getPoints(1000)
    //   创建几何体
    this.geometry = new THREE.BufferGeometry().setFromPoints(ponits)

    //给每一个顶点设置属性
    const aSizeArray = new Float32Array(ponits.length)
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i
    }
    //设置几何体1的顶点属性
    this.geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(aSizeArray, 1)
    )
    //   设置着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uLength: {
          value: ponits.length,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial)

    //改变时间
    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 2,
      repeat: -1,
      ease: "none",
    })
  }
  remove(){
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}
