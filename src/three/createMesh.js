import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import * as THREE from "three";
import createCity from "@/three/mesh/city";
export default function createMesh(){
    createCity()
}