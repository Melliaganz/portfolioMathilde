import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './hero.css';

// Importation des images pour préchargement
import fond1 from '../../assets/webp/fond1.webp';
import fond2 from '../../assets/webp/fond2.webp';
import fond3 from '../../assets/webp/fond3.webp';
import fond4 from '../../assets/webp/fond4.webp';
import fond5 from '../../assets/webp/fond5.webp';

function Hero() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const images = [fond1, fond2, fond3, fond4, fond5];

    // Précharger les images pour éviter l'effet de clignotement
    useEffect(() => {
        const preloadImages = async () => {
            const promises = images.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                });
            });
            await Promise.all(promises);
            setLoaded(true); // Marque les images comme préchargées
        };

        preloadImages();
    }, []);

    // Gérer le changement d'image avec un effet de fondu
    useEffect(() => {
        if (!loaded) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [loaded, images.length]);

    // Intersection Observer pour l'effet d'apparition
    useEffect(() => {
        const currentRef = heroRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        observer.observe(currentRef);
        return () => {
            if (currentRef) observer.disconnect();
        };
    }, []);

    return (
        <section 
            ref={heroRef} 
            className={`heroContainer ${isVisible ? "visible" : ""}`} 
            aria-label={t('hero.ariaLabel')}
            role="img"
        >
            {loaded && images.map((src, index) => (
                <div 
                    key={index} 
                    className={`heroBackground ${index === currentImageIndex ? 'active' : ''}`} 
                    style={{ backgroundImage: `url(${src})` }}
                />
            ))}
            
            <div className="blocDescriptif">
                <h1 className="heroTitle">{t('hero.title')}</h1>
                <p className="heroDescri">{t('hero.description')}</p>
            </div>
        </section>
    );
}

export default Hero;
