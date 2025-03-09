import React, { useEffect, useRef, useState } from 'react'
import "./contact.css"
import { contacts } from '../data/contactsData';


function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const currentRef = contactRef.current;
    if (!currentRef || isVisible) return;

    const observer = new IntersectionObserver(
        ([entry], obs) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                obs.disconnect();
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      if (observer) observer.disconnect();
    };
}, [isVisible]);


    return (
      <section ref={contactRef} className={`contactSection ${isVisible ? "visible" : ""}`}>
      <div className="titleContact">
          <h4>Contact</h4>
      </div>
      <div className="contactsContainer">
          <div className="listeContainer">
              <ul>
                  {contacts.map(({ id, href, text, icon, title }) => (
                      <li key={id} className="contactItem">
                          <a href={href} title={title} target="_blank" rel="noopener noreferrer">
                              {icon} {text}
                          </a>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  </section>
);
}
  
export default Contact;