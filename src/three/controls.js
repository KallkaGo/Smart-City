// 初始化控制器
import {OrbitControls} from "three/addons/controls/OrbitControls";
import camera from "@/three/camera";
import renderer from "@/three/renderer";

const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;

export default controls