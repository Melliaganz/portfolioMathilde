import React, { useEffect, useRef, useState, useMemo } from 'react';
import "./hero.css";
import { useTranslation } from 'react-i18next';

function Hero() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        require('../../assets/webp/fond1.webp'),
        require('../../assets/webp/fond2.webp'),
        require('../../assets/webp/fond3.webp'),
        require('../../assets/webp/fond4.webp'),
        require('../../assets/webp/fond5.webp')
    ];

    const texts = useMemo(() => ({
      title: t('hero.title'),
      description: t('hero.description')
  }), [t]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const currentRef = heroRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(currentRef);

        return () => observer.disconnect();
    }, []);
    
    return (
        <section 
            ref={heroRef} 
            className={`heroContainer ${isVisible ? "visible" : ""}`} 
            style={{ backgroundImage: `url(${images[currentImage]})` }} // 🔥 Dynamique !
            aria-label="Hero Section"
        >
            <div className='blocDescriptif'>
                <h1 className='heroTitle'>{texts.title}</h1>
                <p className='heroDescri'>{texts.description}</p>
            </div>
        </section>
    );
}

export default Hero;
