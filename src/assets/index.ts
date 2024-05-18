import sideImg from "./side-img.webp";
import mainLogo from "./Logo.svg";
import scratchImg from "./scratchImg.jpeg";
import implementImg from "./implementImg.jpeg";
import redesignImg from "./redesignImg.png";
import handImg from "./handImg.jpeg";
import quotes from "./Quotes.svg";
import amira from "./amira.jpeg";
import hager from "./hager.jpeg";
import mai from "./may.jpeg";
import heroImg from "./hero.png";
import ins1 from "./Ins1.png";
import ins2 from "./Ins2.png";
import ins3 from "./Ins3.png";
import ins4 from "./Ins4.png";
import ins5 from "./Ins5.png";
import ins6 from "./Ins6.png";
import ins7 from "./Ins7.png";
import aboutImg from "./about.png";
import bookImg from "./book.png";
import Ellipse from "./Ellipse 578.svg";
import clientImg from "./clientImg.png";
import team1 from "./team-1.png";
import team2 from "./team-2.png";
import team3 from "./team-3.png";

const inspirationImages = [
    {
        src: ins1,
        alt: "inspiration-image-1",
    },
    {
        src: ins2,
        alt: "inspiration-image-2",
    },
    {
        src: ins3,
        alt: "inspiration-image-3",
    },
    {
        src: ins4,
        alt: "inspiration-image-4",
    },
    {
        src: ins5,
        alt: "inspiration-image-5",
    },
    {
        src: ins6,
        alt: "inspiration-image-6",
    },
    {
        src: ins7,
        alt: "inspiration-image-7",
    },
];

const workExamples = [
    {
        src: scratchImg,
        alt: "Design from scratch",
        title: "Design from scratch",
    },
    {
        src: implementImg,
        alt: "Design implementation",
        title: "Design implementation",
    },
    {
        src: redesignImg,
        alt: "Redesign image",
        title: "Redesign image",
    },
    {
        src: handImg,
        alt: "Hand made image",
        title: "Hand made image",
    },
];

const clients = [
    {
        src: amira,
        alt: "Amira Ali",
        name: "Amira Ali",
        review:
            "Khoyout made finding the perfect tailor a breeze! I was able to browse through various options, read reviews, and book my appointment with ease. Highly recommended!",
    },
    {
        src: mai,
        alt: "Mai Ahmed",
        name: "Mai Ahmed",
        review:
            "Khoyout made finding the perfect tailor a breeze! I was able to browse through various options, read reviews, and book my appointment with ease. Highly recommended!",
    },
    {
        src: hager,
        alt: "Hager Ahmed",
        name: "Hager Ahmed",
        review:
            "Khoyout made finding the perfect tailor a breeze! I was able to browse through various options, read reviews, and book my appointment with ease. Highly recommended!",
    },
];
const team = [{
    image: {src: team1, alt: "team1 Image"},
    name: "Nada",
    job: "Hand made specialist"
},
    {
        image: {src: team2, alt: "team2 Image"},
        name: "Mona",
        job: "Redesign specialist"
    },
    {
        image: {src: team3, atl: "team3 Image"},
        name: "Mariam",
        job: "Sewing specialist"
    },
]

export {
    sideImg,
    mainLogo,
    heroImg,
    inspirationImages,
    aboutImg,
    bookImg,
    workExamples,
    quotes,
    clients,
    Ellipse,
    clientImg,
    team
};
