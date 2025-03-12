import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    const [loadedImages, setLoadedImages] = useState([true, false, false, false, false]); // First image loads immediately

    const images = useMemo(() => [fond1, fond2, fond3, fond4, fond5], []);

    // Lazy load images
    useEffect(() => {
        images.forEach((src, index) => {
            if (index === 0) return; // Skip first image (already loaded)
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setLoadedImages((prev) => {
                    const newLoaded = [...prev];
                    newLoaded[index] = true;
                    return newLoaded;
                });
            };
        });
    }, [images]);

    // Start image transition only when first image is loaded
    useEffect(() => {
        if (!loadedImages[0]) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [loadedImages, images.length]);

    // Handle visibility detection
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
            aria-label={t('hero.title')}
        >
            {images.map((src, index) => (
                <div 
                    key={index} 
                    className={`heroBackground ${index === currentImageIndex ? 'active' : ''}`} 
                    style={{
                        backgroundImage: loadedImages[index] ? `url(${src})` : 'none'
                    }}
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
