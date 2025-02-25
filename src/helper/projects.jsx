import React,  { useState, useEffect, useRef } from 'react';
import { Canvas , useFrame} from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import './helper.css';
import { t } from 'i18next';

const projectsData = [
    {
        id: 1,
        title: "3D Model 'Golden Boy'",
        mainImage: "/images/project1_main.jpg",
        model: "/models/turn_around_gun.glb"
    },
];

function Model({ modelPath }) {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();
    const [interacted, setInteracted] = useState(false);

    useFrame(() => {
        if (!interacted && modelRef.current) {
            modelRef.current.rotation.y += 0.005;
        }
    });

    useEffect(() => {
        const stopRotation = () => setInteracted(true);
        window.addEventListener("mousedown", stopRotation);
        window.addEventListener("touchstart", stopRotation);
        return () => {
            window.removeEventListener("mousedown", stopRotation);
            window.removeEventListener("touchstart", stopRotation);
        };
    }, []);


    return <primitive ref={modelRef} object={scene} scale={0.008} rotation={[0,1.6,0.01]} />;
}

function Projects() {
    return (
        <section className="projectsSection">
            {projectsData.map(project => (
                <div key={project.id} className="projectCard">
                    <img src={project.mainImage} alt={project.title} className="mainImage" />
                    <h3>{project.title}</h3>
                    <div className="modelViewer">
                        <Canvas camera={{ position:[2,1,2]}}>
                            <Environment preset='sunset' />
                            <ambientLight intensity={10} />
                            <directionalLight position={[2, 2, 2]} intensity={12} />
                            <Model modelPath={project.model} />
                            <OrbitControls minDistance={2} maxDistance={10}/>
                        </Canvas>
                        <p>{t('portFolio.cliquez')}<TouchAppIcon /></p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Projects;