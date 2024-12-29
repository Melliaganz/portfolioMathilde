import React, { useState } from 'react';
import "./header.css";
import { useTranslation } from 'react-i18next';
import Langues from "../langues/Langues";

function Header() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="headerContainer">
                <h1 className="titreHeader">{t('header.title')}</h1>
                <div className='languesContainer'>
                <Langues />
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? "✖" : "☰"}
                </button>
                <nav className={`navContainer ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><a href="/">{t('header.home')}</a></li>
                        <li><a href="#portfolio">{t('header.Portfolio')}</a></li>
                        <li><a href="#about">{t('header.about')}</a></li>
                        <li><a href="#Resume">{t('header.Resume')}</a></li>
                        <li><a href="#Contact">{t('header.Contact')}</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
