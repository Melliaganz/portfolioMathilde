import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import artStationicon from '../../assets/webp/logoArtStation.webp'
import discordIcon from "../../assets/webp/discord-logo.webp"

export const contacts = [
    {
        id: "discord",
        href: "https://discordapp.com/users/565522360032034836",
        text: "mathilde.hs",
        icon: (
            <img
                src={discordIcon}
                alt="Discord Icon"
                style={{ width: "20px", height: '100%', verticalAlign: "middle"}}
                loading="lazy"  
            />
        ),
        title: "Discord"
    },
    {
        id: "email",
        href: "mailto:mathilde.hugues@wanadoo.fr",
        text: "mathilde.hugues@wanadoo.fr",
        icon: <MailOutlineOutlinedIcon />,
        title: "Email"
    },
    {
        id: "linkedin",
        href: "https://www.linkedin.com/in/mathilde-hugues-GA",
        text: "Mathilde Hugues",
        icon: <LinkedInIcon />,
        title: "Linkedin"
    },
    {
        id: "instagram",
        href: "https://www.instagram.com/mathilde.hgs",
        text: "mathilde.hgs",
        icon: <InstagramIcon />,
        title: "Instagram"
    },
    {
        id:"artStation",
        href: "https://www.artstation.com/mathildehugues4",
        text: "Mathilde Hugues",
        icon: <img src={artStationicon} alt="ArtStation" loading="lazy"                
        style={{ width: "20px", height: '100%', verticalAlign: "middle", }}
        />,
        title: "ArtStation"
    }
];
