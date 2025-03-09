import React from 'react'
import "./about.css"
import { useTranslation } from 'react-i18next'
import mathilde from "../../assets/favicon.jpg"
import arabesque1 from "../../assets/webp/arabesque1.webp"

function About() {
    const { t } = useTranslation();
  return (
    <section className='aboutSection'>
        <div className='aboutContainer'>
        <div className="aboutDescriContainArab" >
        <div className="arabesqueContainer">
            <img src={arabesque1} alt="arabesque"/>
        </div>
        <div className="interieurWithoutArab">
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
        </div>
        <div className='arabesqueBasContainer'>
            <img src={arabesque1} alt="arabesque" />
        </div>
        </div>
    </section>
  )
}

export default About