export type IndustryClient = {
  name: string;
  /** Path under /company-logos when a logo asset exists. */
  logo?: string;
};

/** Client logos and names shown on each industry page “Trusted by” section. */
export const INDUSTRY_CLIENTS: Record<string, IndustryClient[]> = {
  "hrms-for-manufacturing": [
    { name: "BOSQ", logo: "/company-logos/bosq.webp" },
    { name: "TEAM THAI", logo: "/company-logos/thai.webp" },
    { name: "ETRONIX" },
    { name: "HOTPACK" },
    { name: "Carryfoods" },
  ],
  "hrms-for-healthcare": [
    { name: "CAREWELL (AMC)" },
    { name: "STARCINE PHARMACY" },
    { name: "Medical Fitness" },
    { name: "MIDAC", logo: "/company-logos/midac.webp" },
    { name: "Nature X (Vitanatura)" },
  ],
  "hrms-for-real-estate": [
    { name: "LANDMARK", logo: "/company-logos/landmark.webp" },
    { name: "VELLAPPALLY" },
    { name: "Rollecate Engineering Services Pvt Ltd" },
    { name: "Archi Decor / Esperso" },
  ],
  "hrms-for-apparel-textile": [
    { name: "NOVELTY / PAVOOS" },
    { name: "POPPEES", logo: "/company-logos/popees.webp" },
    { name: "YESBHARATH WEDDING COLLECTION", logo: "/company-logos/yesbharath.webp" },
    { name: "RK WEDDING MALL", logo: "/company-logos/weddingmall.webp" },
    { name: "RK-Kollam" },
  ],
  "hrms-for-fintech": [
    { name: "LULU EXCHANGE", logo: "/company-logos/lulu.webp" },
    { name: "Crowe", logo: "/company-logos/crowe.webp" },
  ],
  "hrms-for-it-services": [
    { name: "HEXWHALE (Loudchilli)" },
    { name: "PERFECT" },
    { name: "SAFE" },
    { name: "STORILABS" },
    { name: "Axel Technologies" },
    { name: "AEROVACTIVE", logo: "/company-logos/aerovative.webp" },
    { name: "MSI COMMUNICATION" },
    { name: "Mind Story" },
    { name: "Mind Premium Private Limited" },
  ],
  "hrms-for-hospitality": [
    { name: "EMPIRE GROUP", logo: "/company-logos/empire.webp" },
    { name: "CLUB SULAIMANI", logo: "/company-logos/clubsulaimani.webp" },
    { name: "Kovilakam" },
  ],
  "hrms-for-automotive": [
    { name: "ABRECO", logo: "/company-logos/abreco.webp" },
  ],
  "hrms-for-retail": [
    { name: "ABRECO (UAE)", logo: "/company-logos/abreco.webp" },
    { name: "K E Hassans" },
    { name: "Mark&Orion" },
    { name: "ADITHYA HONDA" },
    { name: "SAFA GROUP", logo: "/company-logos/safa.webp" },
    { name: "MYG" },
    { name: "BGC Trading" },
    { name: "BUDGET PHARMA" },
    { name: "RACKETLOUNGE" },
    { name: "Lufano (Kidonest)" },
    { name: "Seven Years" },
  ],
  "hrms-for-logistics": [
    { name: "SEABLUESHIPYARD", logo: "/company-logos/seablueshipyard.webp" },
    { name: "EXXONIC" },
  ],
  "hrms-for-agriculture": [
    { name: "ROYAL MAX" },
    { name: "ORIENTAL AGRO MULTISTATE CO-OPERATIVE SOCIETY" },
    { name: "Navakerala (Naamcos)" },
  ],
  "hrms-for-education": [
    { name: "ANJUMAN", logo: "/company-logos/anjuman.webp" },
    { name: "Civiianz" },
    { name: "Galaxy Educational" },
  ],
};
