import React from 'react'
import { useTranslation } from 'react-i18next';

function Langues() {
    const {i18n} = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
      };
  return (
    <div className="language-switcher">
    <button onClick={() => changeLanguage('en')}>EN</button>
    <button onClick={() => changeLanguage('fr')}>FR</button>
  </div>
  )
}

export default Langues