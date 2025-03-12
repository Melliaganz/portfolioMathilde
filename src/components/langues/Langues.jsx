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
                    border: currentLanguage === 'en' ? '2px solid #000' : 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '5px',
                }}
            >
                <img
                    src="https://flagcdn.com/w320/gb.png"
                    alt="English"
                    style={{width: 70.39, height: "auto"}}
                    
                />
            </button>
            <button
                onClick={() => changeLanguage('fr')}
                style={{
                    background: currentLanguage === 'fr' ? '#d3d3d3' : 'none', 
                    border: currentLanguage === 'fr' ? '2px solid #000' : 'none', 
                    cursor: 'pointer',
                    padding: '5px', 
                    borderRadius: '5px',
                    title: "Français"
                }}
            >
                <img
                    src="https://flagcdn.com/w320/fr.png"
                    alt="Français"
                    style={{width: 70.39, height: "auto"}}
                />
            </button>
        </div>
    );
}

export default Langues;
