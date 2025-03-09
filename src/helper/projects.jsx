import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './helper.css';
import { useTranslation } from 'react-i18next';
import gun from "../assets/webp/gun copie.webp"
import substance from "../assets/webp/blasphemous.webp"
import diablo from "../assets/webp/illu diablo rhino version a colorer copie.webp"
import gargouille from "../assets/webp/gargouille_render1croped.png"

const projectsData = [
    {
        id: 1,
        title: "3D Model 'Golden Boy'",
        mainImage:  gun,
        model: "/models/turn_around_gun.glb"
    },
    {
        id: 2,
        title: "Rendu susbstance painter",
        mainImage: substance,
        model: null
    },
    {
        id: 3,
        title: "diablo",
        mainImage: diablo,
        model: null
    },
    {
        id: 4,
        title: "Gargouille",
        mainImage: gargouille,
        model: "/models/gargouille.glb"
    }
];

function Model({ modelPath }) {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();
    const [interacted, setInteracted] = useState(false);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.map.flipY = false;
                child.material.map.premultipliedAlpha = false;
            }
        });
    }, [scene]);

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
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const cliquez = t('portFolio.cliquez');

    // Ouvrir le modal
    const openModal = (index) => {
        setCurrentIndex(index);
        setSelectedProject(projectsData[index]);
    };

    // Fermer le modal
    const closeModal = () => {
        setSelectedProject(null);
    };

    // Passer au projet suivant
    const nextProject = () => {
        const newIndex = (currentIndex + 1) % projectsData.length;
        setCurrentIndex(newIndex);
        setSelectedProject(projectsData[newIndex]);
    };

    // Revenir au projet précédent
    const prevProject = () => {
        const newIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
        setCurrentIndex(newIndex);
        setSelectedProject(projectsData[newIndex]);
    };

    return (
        <section className="projectsSection">
            <div className="titlePortfolio">
                <h3>Portfolio</h3>
            </div>
            <div className="gallery">
                {projectsData.map((project, index) => (
                    <div key={project.id} className="projectCard" onClick={() => openModal(index)}>
                        <img src={project.mainImage} alt={project.title} className="mainImage" />
                        <h3>{project.title}</h3>
                    </div>
                ))}
            </div>

            {/* MODAL PLEIN ÉCRAN */}
            {selectedProject && (
                <div className="modalOverlay" onClick={closeModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <button className="closeButton" onClick={closeModal}><CloseIcon /></button>
                        
                        <h2>{selectedProject.title}</h2>

                        {/* Si un modèle est disponible, afficher le modèle 3D */}
                        {selectedProject.model ? (
                            <div className="modelViewer">
                                <Canvas camera={{ position:[2,1,2]}}>
                                    <Environment preset='studio' />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[0, 2, 0]} intensity={1.5} />
                                    <Model modelPath={selectedProject.model} />
                                    <OrbitControls minDistance={2} maxDistance={9}/>
                                </Canvas>
                                <p>{cliquez}<TouchAppIcon /></p>
                            </div>
                        ) : (
                            <img src={selectedProject.mainImage} alt={selectedProject.title} className="modalImage" />
                        )}
                             <button className="navButton prev" onClick={prevProject}><ArrowBackIcon /></button>
                             <button className="navButton next" onClick={nextProject}><ArrowForwardIcon /></button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Projects;
