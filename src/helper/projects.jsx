import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './helper.css';
import { useTranslation } from 'react-i18next';
import arabesque from "../assets/webp/arabesque1.webp";

// Import des images et modèles
import gun from "../assets/webp/gun.webp";
import gun2 from "../assets/webp/gun2.webp";
import gun3 from "../assets/webp/gun3.webp";
import substance from "../assets/webp/blasphemous.webp";
import diablo from "../assets/webp/diabloRhino.webp";
import gargouille from "../assets/webp/gargouille.webp";

const projectsData = [
    { id: 1, title: "3D Model 'Golden Boy'", mainImage: gun, model: "/models/turn_around_gun.glb", otherImages:[gun, gun2, gun3] },
    { id: 2, title: "Rendu Substance Painter", mainImage: substance, model: null },
    { id: 3, title: "Diablo", mainImage: diablo, model: null },
    { id: 4, title: "Gargouille", mainImage: gargouille, model: "/models/gargouille.glb" },
    { id: 5, title: "Armure", mainImage: gargouille, model: "/models/armure.glb" }
];

const ITEMS_PER_PAGE = 4;

function Model({ modelPath }) {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.metalness = 1;
                child.material.roughness = 1;
            }
        });
    }, [scene]);

    return <primitive ref={modelRef} object={scene} scale={0.02} rotation={[0, 1.6, 0.01]} />;
}

function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const portfolioRef = useRef(null);
    const { t } = useTranslation();
    const cliquez = t('portFolio.cliquez');

    // Observer pour l'animation au scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        if (portfolioRef.current) observer.observe(portfolioRef.current);
        return () => observer.disconnect();
    }, []);

    // Gestion des projets paginés
    const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);
    const paginatedProjects = projectsData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const openModal = (index) => {
        setCurrentIndex(index);
        setSelectedProject(paginatedProjects[index]);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <section id="resume" ref={portfolioRef} className={`projectsSection ${isVisible ? 'visible' : ''}`}>
            <div className="titlePortfolio">
                <h1>Portfolio</h1>
            </div>
            <img className="imgArabesque" src={arabesque} alt="enluminures" width={300} height="100%" />

            <div className="gallery">
                {paginatedProjects.map((project, index) => (
                    <div 
                        key={project.id} 
                        className={`projectCard ${isVisible ? 'visible' : ''}`} 
                        onClick={() => openModal(index)}
                    >
                        <img src={project.mainImage} alt={project.title + ' projet'} className="mainImage" />
                        <h2>{project.title}</h2>
                    </div>
                ))}
            </div>

            {/* Boutons de pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 0}>
                        <ArrowBackIcon />
                    </button>
                    <span>Page {currentPage + 1} / {totalPages}</span>
                    <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
                        <ArrowForwardIcon />
                    </button>
                </div>
            )}

            {/* MODAL PLEIN ÉCRAN */}
            {selectedProject && createPortal(
                <div className="modalOverlay" onClick={closeModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>                        
                        <h2>{selectedProject.title}</h2>
                        {selectedProject.model ? (
                            <div className="modelViewer">
                                <Canvas camera={{ position: [3, 2, 3] }}>
                                    <Environment preset="studio" />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[0, 3, 0]} intensity={1} />
                                    <Model modelPath={selectedProject.model} />
                                    <OrbitControls maxDistance={12} />
                                </Canvas>
                                <p>{cliquez} <TouchAppIcon /></p>
                            </div>
                        ) : (
                            <img src={selectedProject.mainImage} alt={selectedProject.title + "image"} className="modalImage" />
                        )}
                        <button className="closeButton" onClick={closeModal} aria-label="Close Modal"><CloseIcon /></button>
                        <button className="navButton prev" onClick={prevPage} aria-label="Previous Page"><ArrowBackIcon /></button>
                        <button className="navButton next" onClick={nextPage} aria-label="Next Page"><ArrowForwardIcon /></button>
                    </div>
                </div>,
                document.body
            )}

            <img className="imgArabesqueBas" src={arabesque} alt="enluminures" width={300} height={'100%'} />
        </section>
    );
}

export default Projects;
