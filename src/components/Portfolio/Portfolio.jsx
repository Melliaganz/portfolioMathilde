import React, { useEffect, useRef, useState } from 'react';
import './portfolio.css';
import Projects from '../../helper/projects';

function Portfolio() {
    const [isVisible, setIsVisible] = useState(false);
    const portfolioRef = useRef(null);

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

    return (
        <section ref={portfolioRef} className={`portfolioSection ${isVisible ? 'visible' : ''}`}>
            <Projects />
        </section>
    );
}

export default Portfolio;
