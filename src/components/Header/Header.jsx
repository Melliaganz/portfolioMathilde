import React from 'react'
import "./header.css"
import { useTranslation } from 'react-i18next'

function Header() {
    const { t, i18n } = useTranslation();
 
  return (
    <header className="header">
        <div className="headerContainer">
        <h1 className="titreHeader">{t('header.title')}</h1>
        <nav className='navContainer'>
            <ul >
            <li><a href="/">{t('header.home')}</a></li>
            <li><a href="#portfolio">{t('header.Portfolio')}</a></li>
            <li><a href="#about">{t('header.about')}</a></li>
            <li><a href="#Resume">{t('header.Resume')}</a></li>
            <li><a href="#Contact">{t('header.Contact')}</a></li>
            </ul>
        </nav>
        </div>
    </header>
)
}

export default Header