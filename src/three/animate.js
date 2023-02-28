import controls from "@/three/controls";
import clock from "@/three/clock";
import renderer from "@/three/renderer";
import scene from "@/three/scene";
import camera from "@/three/camera";

const animate = () => {
    controls.update();
    const time = clock.getElapsedTime()
    requestAnimationFrame(animate);
    // 使用渲染器渲染相机看这个场景的内容渲染出来
    renderer.render(scene, camera);
    
}

export default animate