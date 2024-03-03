import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AnimationMixer, Mesh, AnimationUtils, Vector3, CatmullRomCurve3 } from "three";



const points = [
    new Vector3(-7.5, 0, -7.5),
    new Vector3(-7.5, 0, 7.5),
    new Vector3(7.5, 0, 7.5),
    new Vector3(7.5, 0, -7.5),
]
export function getMotionPoints(idx: number) {
    return points[idx % points.length];
}

export function Drone({ scale, position, droneRef, indexRef }: any) {
    //const [pointsIndex, setPointsIndex] = useState(0);

    points.forEach((point: Vector3) => point.setY = position.y)




    const ref = useRef<ThreeElements['primitive']>();
    droneRef.current = ref;



    const drone = useGLTF("assets/drone_ds.glb");
    const animations = drone.animations;
    //console.log(animations);

    const idleClip = AnimationUtils.subclip(animations[0], 'Animation', 140, 160)

    // Here's the animation part
    // ************************* 
    let mixer: AnimationMixer = new AnimationMixer(drone.scene);
    var idleAction = mixer.clipAction(idleClip);
    idleAction.play() //don't work fine.

    drone.scene.traverse(child => {
        if (child instanceof Mesh) {
            //console.log(true)
            child.castShadow = true
            child.receiveShadow = true
        }
    })


    useFrame((state, delta) => {
        if (ref.current != undefined) {
            // levitation motion
            const path = new CatmullRomCurve3([ref.current.position, points[indexRef.current % points.length]]);

            const newPosition = path.getPointAt(delta);
            ref.current.position.x = newPosition.x;
            ref.current.position.z = newPosition.z;

            ref.current.position.y += Math.sin(state.clock.elapsedTime) * 0.005;


        }

        mixer?.update(delta)
    })


    return (
        <>
            <mesh >

            </mesh>
            <primitive object={drone.scene.children[0]} ref={ref} scale={scale} position={position} />
        </>
    )
}


//    if (pointsIndex != indexRef.current) {
//        ref.current?.lookAt(points[indexRef.current % points.length].x, ref.current.position.y, points[indexRef.current % points.length].z);
//        setPointsIndex(pointsIndex + 1)
//    }
