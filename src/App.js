import './App.scss';
import {Canvas, useFrame} from "react-three-fiber";
import {useRef, useState} from 'react';
import {softShadows, MeshWobbleMaterial, OrbitControls} from "@react-three/drei";
import {useSpring, a} from "react-spring/three";

softShadows();

const SpinningMesh = ({position, args, color, speed}) => {
    const mesh = useRef();
    const [expand, setExpand] = useState(false);
    const props = useSpring({
        scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
    });
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (<a.mesh
        onClick={() => setExpand(!expand)}
        castShadow ref={mesh}
        position={position}
        scale={props.scale}

    >
        {/*<sphereBufferGeometry attach='geometry'*/}
        {/*                   args={[2, 50,10]}/>*/}
        {/*<meshStandardMaterial attach="material"/>*/}
        <boxBufferGeometry attach='geometry'
                           args={args}/>
        <MeshWobbleMaterial attach="material" color={color} speed={speed} factor={.6}/>
    </a.mesh>);
};

function App() {
    return (
        <div className="App">
            <Canvas colorManagement shadowMap camera={{position: [-5, 2, 10], fov: 60}}>
                <ambientLight intensity={.3}/>
                <directionalLight
                    castShadow
                    position={[0, 10, 0]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <pointLight position={[-10, 0, -2]} intensity={.5}/>
                <pointLight position={[0, -10, 0]} intensity={1.0}/>

                <group>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                        <planeBufferGeometry
                            attach='geometry'
                            args={[100, 100]}
                        />
                        <shadowMaterial attach="material" opacity={.3}/>
                    </mesh>
                </group>
                <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color="lightblue" speed={2}/>
                <SpinningMesh position={[-2, 1, -5]} color="pink" speed={6}/>
                <SpinningMesh position={[5, 1, -2]} color="pink" speed={6}/>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default App;
