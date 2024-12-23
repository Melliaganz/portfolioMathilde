import React, { useState, useEffect, useRef } from 'react';
import projectsData from './projects.json'; // Importer le fichier JSON local
import './portfolio.css';

function Portfolio() {
    const [selectedImage, setSelectedImage] = useState(null);
    const carouselRef = useRef(null); // Référence au carrousel
    const projects = projectsData.data;

    // Dupliquer les projets pour simuler une boucle infinie
    const duplicatedProjects = [...projects, ...projects];

    useEffect(() => {
        const carousel = carouselRef.current;
        let index = 0;

        const interval = setInterval(() => {
            index++;
            if (index >= projects.length) {
                // Quand on atteint la fin des duplications, revenir instantanément au début
                setTimeout(() => {
                    carousel.style.transition = 'none'; // Désactive la transition
                    carousel.style.transform = `translateX(0px)`; // Revenir au début
                    index = 0;
                }, 500); // Attendre la fin de la transition
            } else {
                carousel.style.transition = 'transform 0.5s ease-in-out'; // Réactiver la transition
                carousel.style.transform = `translateX(-${index * 300}px)`; // Faire défiler
            }
        }, 3000); // Changer d'image toutes les 3 secondes

        return () => clearInterval(interval); // Nettoyer l'intervalle à la fin
    }, [projects.length]);

    const closeImage = () => setSelectedImage(null);

    return (
        <section className="portfolioSection">
            <div className="portfolioContainer">
                <h2 className="portfolioTitle">Portfolio</h2>
                {projects.length === 0 ? (
                    <p>Aucun projet trouvé.</p>
                ) : (
                    <div className="carouselContainer">
                        <div className="carousel" ref={carouselRef}>
                            {duplicatedProjects.map((project, index) => (
                                <div
                                    key={`${project.id}-${index}`}
                                    className="carouselItem"
                                    onClick={() => setSelectedImage(project.cover.small_square_url)}
                                >
                                    <img
                                        src={project.cover.small_square_url}
                                        alt={project.title}
                                    />
                                    <h3>{project.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {selectedImage && (
                <div className="imageModal" onClick={closeImage}>
                    <img src={selectedImage} alt="Selected project" />
                </div>
            )}
        </section>
    );
}

export default Portfolio;
