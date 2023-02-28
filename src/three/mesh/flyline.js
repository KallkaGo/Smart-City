import * as THREE from 'three'
import gsap from 'gsap'
export default class FlyLine {
    constructor() {
        let linePoints = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(4, 4, 0),
            new THREE.Vector3(8, 0, 0),
        ]
        // 创建曲线
        this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
        // 根据曲线生成管道几何体
        this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.1, 2, false)

        const textureLoader = new THREE.TextureLoader()
       this.texture = textureLoader.load('/textures/z_11.png')
        this.texture.repeat.set(1,2)
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT =THREE.MirroredRepeatWrapping

        //设置飞线的材质
        this.material = new THREE.MeshBasicMaterial({
           
            map:this.texture,
            depthWrite:false,
            // depthTest:false,
            transparent:true

        })
        //创建飞线物体
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        //创建飞线的动画
        gsap.to(this.texture.offset,{
            x:-1,
            duration:1,
            repeat:-1,
            ease:'none'
        })
    }
}