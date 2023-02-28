import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";
import scene from "@/three/scene";
import modifyCityMaterial from "@/three/modify/modifyCityMaterial";
import FlyLine from "@/three/mesh/flyline";
import flyLineShader from "./flyLineshader";
import MeshLine from "@/three/modify/modifyLine";
import LightWall from "./LightWall";
import Radar from "./rader";
import AlarmSprite from "./AddSprite"
export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    const material = new THREE.MeshBasicMaterial({ color: "#004080" });

    gltf.scene.traverse((item) => {
      if (item.type === "Mesh") {
        item.material = material;
        if (item.name === "Layerbuildings") {
          modifyCityMaterial(item);
          const meshLine = new MeshLine(item.geometry)
          const vector3 = item.scale.clone()
          meshLine.mesh.scale.copy(vector3)
          scene.add(meshLine.mesh)
        }
      }
    });

    scene.add(gltf.scene);

    // 添加飞线
    // const flyLine = new FlyLine();
    // scene.add(flyLine.mesh);

    // shader飞线
    // const LineShader = new flyLineShader();
    // scene.add(LineShader.mesh);

    // 添加光墙
    // const lightWall = new LightWall()
    // scene.add(lightWall.mesh)

    // 添加雷达图
    // const radar = new Radar()
    // scene.add(radar.mesh)
    // 添加警告标识
    // const alarm = new AlarmSprite()
    // scene.add(alarm.mesh)
    // alarm.onClick((e)=>{
    //   console.log('警告',e);
    // })
  });
}
