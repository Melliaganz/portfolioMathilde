import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import "./header.css";
import { useTranslation } from 'react-i18next';
import Langues from "../langues/Langues";
import { Email, Grading, Home, Info, Person } from '@mui/icons-material';

function Header() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const firstMenuItemRef = useRef(null); // 🔹 Référence pour le premier élément du menu

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [setMenuOpen]);

    const { texts, menuItems } = useMemo(() => {
        const texts = {
            title: t('header.title'),
            home: t('header.home'),
            portfolio: t('header.portfolio'),
            about: t('header.about'),
            resume: t('header.resume'),
            contact: t('header.contact'),
            openMenu: t('aria-label.menuOuvert'),
            closeMenu: t('aria-label.menuFerme')
        };

        const menuItems = [
            { id: "home", href: "/", text: texts.home, icon: <Home />, title: texts.home },
            { id: "portfolio", href: "#portfolio", text: texts.portfolio, icon: <Person />, title: texts.portfolio },
            { id: "about", href: "#about", text: texts.about, icon: <Info /> , title: texts.about},
            { id: "resume", href: "#Resume", text: texts.resume, icon: <Grading />, title: texts.resume},
            { id: "contact", href: "#Contact", text: texts.contact, icon: <Email />, title: texts.contact }
        ];

        return { texts, menuItems };
    }, [t]);

    useEffect(() => {
        if (menuOpen && firstMenuItemRef.current) {
            firstMenuItemRef.current.focus();
        }
    }, [menuOpen]);

    return (
        <header className="header">
            <div className="headerContainer">
                <h1 className="titreHeader">{texts.title}</h1>
                <div className='languesContainer'>
                <Langues />
                </div>
                <button className="hamburger" onClick={toggleMenu} aria-label={menuOpen ? texts.closeMenu : texts.openMenu } aria-expanded={menuOpen} aria-haspopup>
                    {menuOpen ? "✖" : "☰"}
                </button>
                <nav className={`navContainer ${menuOpen ? "open" : ""}`} role="navigation">
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
