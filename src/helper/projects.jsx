import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './helper.css';
import { useTranslation } from 'react-i18next';
import gun from "../assets/webp/gun.webp";
import gun2 from "../assets/webp/gun2.webp";
import gun3 from "../assets/webp/gun3.webp";
import substance from "../assets/webp/blasphemous.webp";
import diablo from "../assets/webp/diabloRhino.webp";
import gargouille from "../assets/webp/gargouille_render1croped.png";

const projectsData = [
    { id: 1, title: "3D Model 'Golden Boy'", mainImage: gun, model: "/models/turn_around_gun.glb", otherImages:[gun, gun2, gun3] },
    { id: 2, title: "Rendu susbstance painter", mainImage: substance, model: null },
    { id: 3, title: "Diablo", mainImage: diablo, model: null },
    { id: 4, title: "Gargouille", mainImage: gargouille, model: "/models/gargouille.glb" }
];

function Model({ modelPath }) {
    useGLTF.preload(modelPath); 
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();
    
    const [interacted, setInteracted] = useState(false);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                const material = child.material;
                if (material) {
                    material.metalness = 0;
                    material.roughness = 1; 
                    material.reflectivity = 0;
                }
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
        document.addEventListener("mousedown", stopRotation);
        document.addEventListener("touchstart", stopRotation);
        return () => {
            document.removeEventListener("mousedown", stopRotation);
            document.removeEventListener("touchstart", stopRotation);
        };
    }, []);
    const controls = useRef();
    <OrbitControls ref={controls} onStart={() => (controls.current.enabled = true)} />
    return <primitive ref={modelRef} object={scene} scale={0.02} rotation={[0, 1.6, 0.01]} />;
}

function Projects() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const portfolioRef = useRef(null);

    const cliquez = t('portFolio.cliquez');
    
    // Observer pour l'animation au scroll
    useEffect(() => {
        const currentRef = portfolioRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        observer.observe(currentRef);
        return () => {
            if (currentRef) observer.disconnect();
        };
    }, []);

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
        <section 
            ref={portfolioRef} 
            className={`projectsSection ${isVisible ? 'visible' : ''}`}
        >
            <div className="titlePortfolio">
                <h3>Portfolio</h3>
            </div>
            <div className="gallery">
                {projectsData.map((project, index) => (
                    <div 
                        key={project.id} 
                        className={`projectCard ${isVisible ? 'visible' : ''}`} 
                        onClick={() => openModal(index)}
                    >
                        <img src={project.mainImage} alt={project.title} className="mainImage" />
                        <h3>{project.title}</h3>
                    </div>
                ))}
            </div>

            {/* MODAL PLEIN ÉCRAN */}
            {selectedProject && createPortal(
                <div className="modalOverlay" onClick={closeModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>                        
                        <h2>{selectedProject.title}</h2>

                        {/* Affichage du modèle 3D si disponible */}
                        {selectedProject.model ? (
                <div className="modelViewer">
                    <Canvas camera={{ position: [3, 2, 3] }}>
                        <Environment preset="studio" />
                        <ambientLight intensity={0} />
                        <directionalLight position={[0, 3, 0]} intensity={0} />
                        <Model modelPath={selectedProject.model} />
                        <OrbitControls minDistance={6} maxDistance={12} />
                    </Canvas>
                    <p>{cliquez} <TouchAppIcon /></p>
                </div>
            ) : (
                <img src={selectedProject.mainImage} alt={selectedProject.title} className="modalImage" />
            )}
                        <button className="closeButton" onClick={closeModal} aria-label="Close Modal"><CloseIcon /></button>
                        <button className="navButton prev" onClick={prevProject} aria-label="Previous Project"><ArrowBackIcon /></button>
                        <button className="navButton next" onClick={nextProject}  aria-label="Next Project"><ArrowForwardIcon /></button>
                    </div>
                </div>,
                document.body

            )}
        </section>
    );
}

export default Projects;
