import { Html, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";





export function OverLayItem({ className, title, description, bgColor, ...props }: any) {

    return (
        <Html transform distanceFactor={1.2} center
            className={`w-48 rounded-md overflow-hidden transition-opacity duration-1000 ${className}`}
            {...props}
        >
            <div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs p-2 w-full">
                <h2 className="font-bold">{title}</h2>
                <p>{description}</p>
            </div>
            <button className={`${bgColor} hover:bg-opacity-50 transition-colors duration-500 px-4 py-2 font-bold text-white w-full text-xs`}></button>


        </Html>
    )

}


export function TextDescription({ position, title, description, color, onClick, cameraRef, scale, clickable = false }: any) {
    const textFieldRef: React.LegacyRef<any> = useRef(null);

    useFrame(() => {
        if (textFieldRef != undefined && cameraRef != undefined) {
            textFieldRef.current.lookAt(cameraRef.current.position);
        }
    })

    return (
        <Text scale={scale} font='fonts/Poppins/Poppins-Black.ttf' color={color} position={position}
            onPointerDown={() => {
                if (clickable) {
                    onClick();

                }
            }
            }
            onPointerEnter={() => {
                if (clickable) {
                    //console.log(e)
                    textFieldRef.current.color = "white";
                }

            }}
            onPointerLeave={() => {
                if (clickable) {
                    //console.log(e)
                    textFieldRef.current.color = "black";

                }

            }}
            ref={textFieldRef}>
            {title} {"\n"}{description}
            <meshBasicMaterial color="black"></meshBasicMaterial>
        </Text>

    )

}