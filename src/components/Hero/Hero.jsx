import React from 'react'
import "./hero.css"
import { useTranslation } from 'react-i18next'

function Hero() {
    const { t } = useTranslation();
  return (
    <section className='heroContainer'>
        <div className='blocDescriptif'>
            <h1 className='heroTitle'>{t('hero.title')}</h1>
            <p className='heroDescri'>{t('hero.description')}</p>
        </div>
    </section>
  )
}

export default Hero