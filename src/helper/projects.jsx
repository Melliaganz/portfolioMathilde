import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./helper.css";
import { useTranslation } from "react-i18next";
import arabesque from "../assets/webp/arabesque1.webp";

// Import des images et modèles
import gun from "../assets/webp/gun.webp";
import gun2 from "../assets/webp/gun2.webp";
import gun3 from "../assets/webp/gun3.webp";
import substance from "../assets/webp/blasphemous.webp";
import diablo from "../assets/webp/diabloRhino.webp";
import gargouille from "../assets/webp/gargouille.webp";
import armure from "../assets/webp/armure.webp";
import environement1 from "../assets/webp/fond1.webp";
import environement2 from "../assets/webp/fond2.webp";
import environement3 from "../assets/webp/fond3.webp";
import environement4 from "../assets/webp/fond4.webp";
import environement5 from "../assets/webp/fond5.webp";



const projectsData = [
  { id: 1, title: "3D Model 'Golden Boy'", mainImage: gun, model: "/models/turn_around_gun.glb", otherImages: [gun, gun2, gun3] },
  { id: 2, title: "Rendu Substance Painter", mainImage: substance, model: null },
  { id: 3, title: "Diablo", mainImage: diablo, model: null },
  { id: 4, title: "Gargouille", mainImage: gargouille, model: "/models/gargouille.glb" },
  { id: 5, title: "Armure", mainImage: armure, model: "/models/armure.glb" },
  { id: 6, title: "Vallée", mainImage: environement1, model: null },
  { id: 7, title: "Bloodbound - Corridor", mainImage: environement2, model: null},
  { id: 8, title: "Bloodbound - Core", mainImage: environement3, model: null},
  { id: 9, title: "Bloodbound - End", mainImage: environement4, model: null},
  { id: 10, title: "Bloodbound - Gateway", mainImage: environement5, model: null}
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
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null); // null = pas de modal ouverte
  const [isVisible, setIsVisible] = useState(false);
  const portfolioRef = useRef(null);
  const { t } = useTranslation();
  const cliquez = t("portFolio.cliquez");

  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (portfolioRef.current) observer.observe(portfolioRef.current);
    return () => observer.disconnect();
  }, []);

  // Gestion escape key pour fermer la modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);
  const paginatedProjects = projectsData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const openModal = (index) => {
    const globalIndex = currentPage * ITEMS_PER_PAGE + index;
    setCurrentIndex(globalIndex);
  };

  const closeModal = () => {
    setCurrentIndex(null);
  };

  const nextProjectInModal = () => {
    const newIndex = (currentIndex + 1) % projectsData.length;
    setCurrentIndex(newIndex);
  };

  const prevProjectInModal = () => {
    const newIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setCurrentIndex(newIndex);
  };

  const selectedProject = currentIndex !== null ? projectsData[currentIndex] : null;

  return (
    <section id="resume" ref={portfolioRef} className={`projectsSection ${isVisible ? "visible" : ""}`}>
      <div className="titlePortfolio">
        <h1>Portfolio</h1>
      </div>
      <img className="imgArabesque" src={arabesque} alt="enluminures" width={300} height="100%" />

      <div className="gallery">
        {paginatedProjects.map((project, index) => (
          <div key={project.id} className={`projectCard ${isVisible ? "visible" : ""}`} onClick={() => openModal(index)}>
            <img src={project.mainImage} alt={`${project.title} projet`} className="mainImage" />
            <h2>{project.title}</h2>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 0} aria-label="Previous Page">
            <ArrowBackIcon />
          </button>
          <span>Page {currentPage + 1} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1} aria-label="Next Page">
            <ArrowForwardIcon />
          </button>
        </div>
      )}

      {selectedProject && createPortal(
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
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
              <img src={selectedProject.mainImage} alt={`${selectedProject.title} image`} className="modalImage" />
            )}
            <button className="closeButton" onClick={closeModal} aria-label="Close Modal"><CloseIcon /></button>
            <button className="navButton prev" onClick={prevProjectInModal} aria-label="Previous Project"><ArrowBackIcon /></button>
            <button className="navButton next" onClick={nextProjectInModal} aria-label="Next Project"><ArrowForwardIcon /></button>
          </div>
        </div>,
        document.body
      )}

      <img className="imgArabesqueBas" src={arabesque} alt="enluminures" width={300} height="100%" />
    </section>
  );
}

export default Projects;
