import React from 'react'
import "./about.css"
import { useTranslation } from 'react-i18next'
import mathilde from "../../assets/favicon.jpg"

function About() {
    const { t } = useTranslation();
  return (
    <section className='aboutSection'>
        <div className='aboutContainer'>
            <div className='aboutTitleAndPp'>
                <div className='aboutTitle'>
                    <h3>{t('about.title')}</h3>
                </div>
                <div className='aboutPic'>
                    <img src={mathilde} alt="Mathilde Hugues"></img>
                </div>
            </div>
            <div className='aboutDescri'>
                <p>{t('about.description')}</p>
            </div>
        </div>
    </section>
  )
}

export default About