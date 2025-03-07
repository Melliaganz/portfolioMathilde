import React from 'react';
import "../Header/header.css"
import { useTranslation } from 'react-i18next';

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
                    style={{ width: '40px', height: '30px' }}
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
                }}
            >
                <img
                    src="https://flagcdn.com/w320/fr.png"
                    alt="Français"
                    style={{ width: '40px', height: '30px' }}
                />
            </button>
        </div>
    );
}

export default Langues;
