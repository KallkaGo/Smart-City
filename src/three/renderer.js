// 初始化渲染器
import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
    // logarithmicDepthBuffer: true,
});
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

export default renderer