import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three';


export function Scene() {

    const scene = useGLTF("assets/iotax_scene.glb");

    scene.scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    return (
        <primitive object={scene.scene} scale={1.2} />
    )


}