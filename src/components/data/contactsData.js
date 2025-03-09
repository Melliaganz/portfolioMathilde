import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export const contacts = [
    {
        id: "discord",
        href: "https://discordapp.com/users/565522360032034836",
        text: "mathilde.hs",
        icon: (
            <img
                src="https://img.icons8.com/m_rounded/512/FFFFFF/discord-logo.png"
                alt="Discord Icon"
                style={{ width: "20px", verticalAlign: "middle", marginRight: "8px" }}
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
        icon: (<img 
                src="https://www.pngkey.com/png/full/307-3071381_professional-artworks-gallery-artstation-logo-white-png.png" 
                alt="ArtStation Icon" 
                style={{ width: "20px", verticalAlign: "middle", marginRight: "8px", color:"#fff" }}
                />),
        title: "ArtStation"
    }
];
