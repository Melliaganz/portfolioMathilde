import { Email, Grading, Home, Info, Person } from '@mui/icons-material';
import React, { useEffect, useMemo, useRef, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import Langues from '../langues/Langues';

const menuReducer = (state) => !state;

function Header() {
    const { t } = useTranslation();
    const firstMenuItemRef = useRef(null);

    const [menuOpen, toggleMenu] = useReducer(menuReducer, false);

    const { texts, menuItems } = useMemo(() => ({
        texts: {
            title: t('header.title'),
            home: t('header.home'),
            portfolio: t('header.portfolio'),
            about: t('header.about'),
            resume: t('header.resume'),
            contact: t('header.contact'),
            openMenu: t('aria-label.menuOuvert'),
            closeMenu: t('aria-label.menuFerme')
        },
        menuItems: [
            { id: "home", href: "/", text: t('header.home'), icon: <Home />, title: t('header.home') },
            { id: "portfolio", href: "#portfolio", text: t('header.portfolio'), icon: <Person />, title: t('header.portfolio') },
            { id: "about", href: "#about", text: t('header.about'), icon: <Info />, title: t('header.about') },
            { id: "resume", href: "#Resume", text: t('header.resume'), icon: <Grading />, title: t('header.resume') },
            { id: "contact", href: "#Contact", text: t('header.contact'), icon: <Email />, title: t('header.contact') }
        ]
    }), [t]);

    useEffect(() => {
        if (menuOpen && firstMenuItemRef.current) {
            firstMenuItemRef.current.focus();
        }
    }, [menuOpen]);

    return (
        <header className="header">
            <div className="headerContainer">
                <h1 className="titreHeader">Mathilde Hugues</h1>
                <div className='languesContainer'>
                    <Langues />
                </div>
                <button 
                    className="hamburger" 
                    onClick={toggleMenu} 
                    aria-label={menuOpen ? texts.closeMenu : texts.openMenu} 
                    aria-expanded={menuOpen} 
                    aria-haspopup
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
                <nav className={`navContainer ${menuOpen ? "open" : ""}`} role="navigation" aria-hidden={!menuOpen}>
                    <ul role="menu">
                        {menuItems.map(({ id, href, text, icon, title }) => (
                            <li key={id} role="menuitem">
                                <a href={href} title={title}>{icon} {text}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
