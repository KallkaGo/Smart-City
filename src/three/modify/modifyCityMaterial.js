import * as THREE from 'three'
import gsap from 'gsap'
export default function modifyCityMaterial(mesh) {


    mesh.material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace("#include <dithering_fragment>", `
        #include <dithering_fragment>
       //#end#
        `)
        gradColor(shader, mesh)
        addSpread(shader, mesh)
        addLightLine(shader,mesh)
        addBtoT(shader,mesh)
    }

}

export function gradColor(shader, mesh) {
    mesh.geometry.computeBoundingBox()
    // 获取物体高度差
    
    let {min, max} = mesh.geometry.boundingBox
    let Height = max.y - min.y
    shader.uniforms.uHeight = {
        value: Height
    }
    shader.uniforms.uTopColor = {value: new THREE.Color('#aaaeff')}
    shader.vertexShader = shader.vertexShader.replace("#include <common>", `
        #include <common>
        varying vec3 vPosition;
        varying vec2 vUv;
        
        `)
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `
        #include <begin_vertex>
        vPosition = position;
        vUv = uv;
        `)

    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `
        #include <common>
        uniform vec3 uTopColor;
        uniform float uHeight;
        varying vec3 vPosition;
        varying vec2 vUv;
        `)
    shader.fragmentShader = shader.fragmentShader.replace("//#end#", `
        //#end#
        vec4 distGradColor = gl_FragColor;
        //设置混合的百分比
        float gradMix =vPosition.y/uHeight;
        float strength = 1.0-vUv.y;
        //计算出混合颜色
        vec3 mixColor = mix(distGradColor.xyz,uTopColor,gradMix);
        gl_FragColor = vec4(mixColor,1);
        
        
        `)
}

export function addSpread(shader, mesh) {
    //设置扩散中心点
    shader.uniforms.uCenter = {value: new THREE.Vector2()}
    // 扩散的时间
    shader.uniforms.uTime = {value: 0}
    //扩散带的宽度
    shader.uniforms.uWidth = {value: 20}
    shader.fragmentShader= shader.fragmentShader.replace('#include <common>',
        `#include <common>
         uniform vec2 uCenter;
         uniform float uTime;
         uniform float uWidth;
        `
        )
    shader.fragmentShader= shader.fragmentShader.replace('//#end#',
        `//#end#
         
         float radius =distance(vPosition.xz,uCenter); 
         //扩散范围
         float spreadIndex = -(radius - uTime)*(radius - uTime) + uWidth;
         vec4 mixedColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uWidth);
         if(spreadIndex > 0.0){
         gl_FragColor =mixedColor;
         }
         //#end#
        `
    )
    gsap.to(shader.uniforms.uTime,{
        value:500,
        duration:5,
        ease:'none',
        repeat:-1
    })
}

export function addLightLine(shader, mesh) {
   
    // 扩散的时间
    shader.uniforms.uLineTime = {value: -500}
    //扩散带的宽度
    shader.uniforms.uLineWidth = {value: 20}
    shader.fragmentShader= shader.fragmentShader.replace('#include <common>',
        `#include <common>
         uniform float uLineTime;
         uniform float uLineWidth;
        `
        )
    shader.fragmentShader= shader.fragmentShader.replace('//#end#',
        `//#end#
         
         //扩散范围
         float LightLineMix = -(vPosition.x+vPosition.z - uLineTime)*(vPosition.x+vPosition.z - uLineTime) + uLineWidth;
         vec4 mixedLineColor = mix(gl_FragColor,vec4(1,1,1,1),LightLineMix/uLineWidth);
         if(LightLineMix > 0.0){
         gl_FragColor =mixedLineColor;
         }
         //#end#
        `
    )
    gsap.to(shader.uniforms.uLineTime,{
        value:500,
        duration:5,
        ease:'none',
        repeat:-1
    })
}

export function addBtoT(shader, mesh) {
   
    // 扩散的时间
    shader.uniforms.uTopTime = {value: 0}
    //扩散带的宽度
    shader.uniforms.uTopWidth = {value: 20}
    shader.fragmentShader= shader.fragmentShader.replace('#include <common>',
        `#include <common>
         uniform float uTopTime;
         uniform float uTopWidth;
        `
        )
    shader.fragmentShader= shader.fragmentShader.replace('//#end#',
        `//#end#
         
         //扩散范围
         float toTopMix = -(vPosition.y - uTopTime)*(vPosition.y - uTopTime) + uTopWidth;
         float mixTop = vPosition.y +uTopTime;
         vec4 mixedtoTopColor = mix(gl_FragColor,vec4(0.8,0.8,1,1),toTopMix/uTopWidth);
         if(toTopMix > 0.0){
         gl_FragColor =mixedtoTopColor;
         }
         //#end#
        `
    )
    gsap.to(shader.uniforms.uTopTime,{
        value:200,
        duration:2,
        ease:'none',
        repeat:-1
    })
}