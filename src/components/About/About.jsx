import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './about.css';
import mathilde from '../../assets/favicon.jpg';
import arabesque1 from '../../assets/webp/arabesque1.webp';

function About() {
    const { t } = useTranslation();
    const texts =  {title: t('about.title'), description: t('about.description') }
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const currentRef = aboutRef.current;
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
        <section id="about" ref={aboutRef} className={`aboutSection ${isVisible ? 'visible' : ''}`}>
            <div className="aboutContainer">
                <div className="aboutDescriContainArab">
                    <figure className="arabesqueContainer">
                        <img src={arabesque1} alt="Decorative arabesque pattern" loading="lazy" />
                    </figure>
                    <div className="interieurWithoutArab">
                        <div className="aboutTitleAndPp">
                            <h2 className="aboutTitle">{texts.title}</h2>
                            <figure className="aboutPic">
                                <img src={mathilde} alt="Mathilde Hugues" loading="lazy" />
                            </figure>
                        </div>
                        <p className="aboutDescri">{texts.description}</p>
                    </div>
                </div>
                <figure className="arabesqueBasContainer">
                    <img src={arabesque1} alt="Decorative arabesque pattern" loading="lazy" />
                </figure>
            </div>
        </section>
    );
}

export default About;
