import * as THREE from 'three'
export default class MeshLine{
    constructor(geometry) {
        const edges = new THREE.EdgesGeometry(geometry)
        const lines = new THREE.LineSegments(
            edges,new THREE.LineBasicMaterial({
                color:'white'
            })
        )
        this.geometry = edges
        this.material =lines.material
        this.mesh = lines
    }
}