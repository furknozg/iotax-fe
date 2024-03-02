import { useEffect, useRef, useState } from 'react'
import './App.css'



import { Canvas, useFrame } from '@react-three/fiber'
import { DirectionalLightHelper, PerspectiveCamera, Vector3 } from 'three'
import { Scene } from './components/assets/scene'
import { OrbitControls, useHelper, Text } from '@react-three/drei'
import { Drone } from './components/assets/drone'
import { OverLayItem, TextDescription } from './components/ui/textComp'

interface camProps {
  position: Vector3,
  fov: number,
  aspect: number,
  near: number,
  far: number
}
interface lightProps {
  position: Vector3,
  intensity: number,
  power: number,
  color: string,
  castShadow: boolean

}
interface modelProps {
  position: Vector3,
  scale: number
}

interface sceneProps {
  spotLightProps: lightProps,
  droneProps: modelProps
}




const cameraProps: camProps = {
  position: new Vector3(0, 15, 0),
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 200
}
const spotLightProps: lightProps = {
  position: new Vector3(0, 30, -15),
  intensity: 1.5,
  power: 4000,
  color: "#fff",
  castShadow: true
}
const droneProps: modelProps = {
  position: new Vector3(-7.5, 5, -7.5),
  scale: 1,
}

export function getCameraPosition() {
  return cameraProps.position
}
function setCameraPosition(position: Vector3) {
  cameraProps.position = position;
}



function App() {
  const cameraRef: any = useRef(new PerspectiveCamera(cameraProps.fov, cameraProps.aspect, cameraProps.near, cameraProps.far));


  const [pointsIndex, setPointsIndex] = useState(0);
  const pointRef = useRef(pointsIndex);

  const droneRef: any = useRef(null);
  const droneCompRef: any = useRef(null);

  useEffect(() => {
    cameraRef.current.position.set(cameraProps.position.x, cameraProps.position.y, cameraProps.position.z)
  }, [cameraRef])


  const Scenery = ({ spotLightProps, droneProps }: sceneProps) => {
    const spotLightRef = useRef<any>(null);

    // useHelper(spotLightRef, DirectionalLightHelper, 0.5)

    useFrame((state, delta) => {
      if (cameraRef.current != undefined) {
        cameraRef.current.lookAt(droneRef.current.current.position);
      }

    })

    droneCompRef.current = <Drone scale={droneProps.scale} position={droneProps.position} droneRef={droneRef} indexRef={pointRef} />


    //console.log(spotLightProps.position);
    return (
      <>
        <ambientLight></ambientLight>
        <spotLight position={spotLightProps.position} intensity={spotLightProps.intensity}
          color={spotLightProps.color} power={spotLightProps.power} castShadow={spotLightProps.castShadow} ref={spotLightRef}
        />
        {droneCompRef.current}

        <Scene />

      </>
    )
  }




  return (
    <>
      <Canvas camera={cameraRef.current} shadows={true} >
        <group>

          <TextDescription scale={0.8} cameraRef={cameraRef} title="Introducing IoTax Argo"
            description={`The new innovative method of agriculture \n`} position={[-8, 7, -8]} />
          <TextDescription scale={0.3} cameraRef={cameraRef} title="" description={`That also aids you in the digital realm`} position={[-8, 7, -3]} />

          <TextDescription scale={0.3} cameraRef={cameraRef} title="" description={`Click Here To Continue`} position={[-8, 5.9, -3]} clickable={true}

            onClick={() => {
              // set anim state here (migrate the state to this scope)

              droneCompRef.current.props.indexRef.current = 1;

            }}

          />

        </group>
        <group>

          <TextDescription scale={0.5} cameraRef={cameraRef} title="How It Works:"
            description={`Argo is a modular drone system designed for \nagriculture.`} position={[-8, 8, 8]} />
          <TextDescription scale={0.2} cameraRef={cameraRef} title=""
            description={`Meaning that on the field it can assist \nyou in tasks like irrigation, monitoring, pest control and more\nwith aid from different modules that can be installed to it!\nYou as the owner can either control it via a web interface or \nlet the drone figure it out autonomously...`} position={[-5, 6, 10]} />
          <TextDescription scale={0.2} cameraRef={cameraRef} title=""
            description={`Argo will also be able to support self charging with \nan on ground charger install, after which you \ncan lay back and let the drone do the work! `} position={[-4, 6, 4]} />

          <TextDescription scale={0.2} cameraRef={cameraRef} title="" description={`Click Here To Continue`} position={[-4, 5.9, 9]} clickable={true}
            onClick={() => {
              // set anim state here (migrate the state to this scope)

              droneCompRef.current.props.indexRef.current = 2;

            }} />

        </group>

        <group>
          <TextDescription scale={0.5} cameraRef={cameraRef} title="Connecting you to the web:"
            description={`Asides from being an agricultural drone,\nArgo can also be retrofitted with a cellular receptor.\nAiding you and your neighbors to connect on the field,\nregardless of the location!`} position={[9, 8, 8]} />
          <TextDescription scale={0.2} cameraRef={cameraRef} title=""
            description={`We believe with this technology,\nIf integrated to agriculture can aid with digital divide.\nHelping with better internet coverage in rural regions!`} position={[5.3, 5, 5.4]} />

          <TextDescription scale={0.2} cameraRef={cameraRef} title="" description={`Click Here To Continue`} position={[4.5, 5, 4.5]} clickable={true}
            onClick={() => {
              // set anim state here (migrate the state to this scope)

              droneCompRef.current.props.indexRef.current = 3;

            }} />

        </group>

        <group>
          <TextDescription scale={0.8} cameraRef={cameraRef} title="Digital is the future"
            description={``} position={[10, 7, -10]} />

          <TextDescription scale={0.2} cameraRef={cameraRef} title=""
            description={`With our state of the art technology\n you can benefit from faster infrastructural deployment\nwhen compared to standard cellular extensions.\n\n Additionally with this new drone technology,\nwe believe that we can scale it up to town scaled\nnetworks! Which can further develop rural regions with less cost...`}
            position={[4.5, 7, -10.5]} />

          <TextDescription scale={0.15} cameraRef={cameraRef} title=""
            description={`Think of a drone that connects\n you and works the field! \nCurrently we are at a prototype phase,\nthe drone may not represent the actual product`}
            position={[4.5, 5, -9.5]} />


          <TextDescription scale={0.2} cameraRef={cameraRef} title="" description={`Click Here To Go Back`} position={[4.5, 5, -4.5]} clickable={true}
            onClick={() => {
              // set anim state here (migrate the state to this scope)

              droneCompRef.current.props.indexRef.current = 4;

            }} />
        </group>

        <Scenery spotLightProps={spotLightProps} droneProps={droneProps} />


      </Canvas >
    </>
  )
}

export default App
