import React from 'react'
import "./contact.css"

import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { GitHub } from '@mui/icons-material';

function Contact() {
    return (
      <section className="contactSection">
        <div className="titleContact">
          <h4>Contact</h4>
        </div>
        <div className="contactsContainer">
          <div className="listeContainer">
            <ul>
              <li>
                <a
                  href="https://discordapp.com/users/565522360032034836"
                  alt="discord"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/m_rounded/512/FFFFFF/discord-logo.png"
                    alt="Discord Icon"
                    style={{ width: "20px", verticalAlign: "middle", marginRight: "8px" }}
                  />
                  mathilde.hs
                </a>
              </li>
              <li>
                <a
                  href="mailto:mathilde.hugues@wanadoo.fr"
                  alt="E-mail"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlineOutlinedIcon />
                  mathilde.hugues@wanadoo.fr
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mathilde-hugues-GA"
                  alt="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                  Mathilde Hugues
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bluepine.s"
                  alt="instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  bluepine.s
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  
  export default Contact;