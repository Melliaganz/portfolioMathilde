import React from 'react';
import "../Header/header.css"
import { useTranslation } from 'react-i18next';
import "../../App.css"

function Langues() {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const currentLanguage = i18n.language;

    return (
        <div className="language-switcher">
            <button
                onClick={() => changeLanguage('en')}
                style={{
                    background: currentLanguage === 'en' ? '#d3d3d3' : 'none',
                    color: currentLanguage === 'en' ? 'black' : 'white',
                    border: currentLanguage === 'en' ? '2px solid #000' : 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '5px',
                    title: "EN"
                }}
            >
                EN
            </button>
           <span style={{color:'var(--secondary)'}}> | </span>
            <button
                onClick={() => changeLanguage('fr')}
                style={{
                    background: currentLanguage === 'fr' ? '#d3d3d3' : 'none', 
                    color: currentLanguage !== 'fr' ? 'white' : 'black',
                    border: currentLanguage === 'fr' ? '2px solid #000' : 'none', 
                    cursor: 'pointer',
                    padding: '5px', 
                    borderRadius: '5px',
                    title: "FR"
                }}
            >
                FR
            </button>
        </div>
    );
}

export default Langues;
