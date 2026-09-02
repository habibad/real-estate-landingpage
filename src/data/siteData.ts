export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  area: string;
  bedrooms: string;
  price: string;
  image: string;
  description: string;
  features: string[];
}

export interface BeliefData {
  id: number;
  numberStr: string;
  title: string;
  description: string;
  hasArtwork?: boolean;
}

export const SITE_CONTENT = {
  en: {
    nav: {
      brand: "ELYSE",
      bookVisit: "BOOK A VISIT",
      menu: "MENU",
      close: "CLOSE",
    },
    hero: {
      brand: "ELYSE",
      tagline: "HOLISTIC LUXURY IN PERFECT HARMONY",
      description:
        "Welcome to Elyse Residence, where timeless design, wellness-focused living and cultural enrichment converge in order to create an unparalleled sanctuary of elegance and serenity.",
      scroll: "SCROLL",
    },
    about: {
      tag: "(ABOUT)",
      headline: ["TIMELESS", "DESIGN.", "WELLNESS-", "FOCUSED", "LIVING."],
      paragraph1:
        "Every element of Elyse Residence reflects a commitment to excellence. From the timeless elegance of its interiors to its thoughtfully curated amenities, the property embodies a holistic approach to luxury living.",
      paragraph2:
        "Whether you're seeking a serene retreat, cultural hub, or a space that fosters personal growth, Elyse Residence offers it all.",
      cta: "LEARN MORE",
    },
    metrics: {
      livingSpace: {
        start: 70,
        end: 150,
        unit: "sq. ft.",
        suffix: "k",
        label: "of meticulously designed living space.",
      },
      greenSpaces: {
        start: 37,
        end: 60,
        unit: "%",
        label: "green spaces for tranquility & wellness.",
      },
      residences: {
        start: 17,
        end: 30,
        unit: "",
        label: "exclusive residences, each tailored for comfort & elegance.",
      },
      concierge: {
        value: "24/7",
        label: "concierge services, meeting every need effortlessly.",
      },
    },
    projects: {
      tag: "(OUR PROJECTS)",
      headline: "LUMIÈRE DUPLEX RESIDENCES",
      description:
        "Two-story luxury apartments that features sunlit living spaces, private terraces, and a selection of exclusive amenities.",
      cta: "LEARN MORE",
      items: [
        {
          id: 1,
          title: "LUMIÈRE LOUNGE & SALON",
          subtitle: "Contemporary sanctuary featuring bespoke lighting and tailored furnishings",
          category: "Shared Social Spaces",
          area: "4,200 sq. ft.",
          bedrooms: "Private Salon",
          price: "Inquire for details",
          image: "/images/project-lounge-v2.jpg",
          description:
            "Designed by world-renowned interior architects, the Lumière Lounge combines soaring double-height ceilings with organic acoustic drapery, custom Italian leather seating, and sculptural lighting elements.",
          features: [
            "Private sommelier tasting alcove",
            "Acoustically tuned ambient music zones",
            "Bespoke brass pendant chandeliers",
            "Floor-to-ceiling panoramic glass panels",
          ],
        },
        {
          id: 2,
          title: "LUMIÈRE MASTER DUPLEX",
          subtitle: "Minimalist master sanctuary with natural walnut accents and linen textures",
          category: "Private Residence",
          area: "3,850 sq. ft.",
          bedrooms: "4 Bedrooms · 5 Bathrooms",
          price: "$6,450,000",
          image: "/images/project-bedroom-v2.jpg",
          description:
            "An oasis of quiet sophistication. The master suite features solid American walnut millwork, handcrafted Italian linen bedding, circadian rhythm circadian smart lighting, and an expansive spa-inspired en-suite bathroom.",
          features: [
            "Custom integrated walnut headboard & nightstands",
            "Dual walk-in dressing rooms with glass cabinetry",
            "Freestanding honed marble soaking tub",
            "Private morning terrace overlooking serene gardens",
          ],
        },
        {
          id: 3,
          title: "LUMIÈRE GRAND RESIDENCE",
          subtitle: "Double-height living space harmonizing exterior nature with interior luxury",
          category: "Duplex Penthouse",
          area: "5,600 sq. ft.",
          bedrooms: "5 Bedrooms · 6 Bathrooms",
          price: "$8,900,000",
          image: "/images/project-living-v2.jpg",
          description:
            "The pinnacle of Elyse Residence. Expansive living spaces framed with dark architectural slatted timber, automated climate envelopes, seamless stone floor transitions, and an integrated private rooftop plunge pool.",
          features: [
            "18-foot double-height entertaining salon",
            "Custom Gaggenau kitchen with quartzite island",
            "Architectural vertical cedar slat partitions",
            "Direct keycard high-speed elevator access",
          ],
        },
      ],
    },
    beliefs: {
      tag: "(OUR BELIEFS)",
      headline: "A VISION OF INSPIRED LIVING",
      subHeadline:
        "To inspire and nurture an enriched lifestyle that harmonizes beauty, wellness, and cultural connection, creating a sanctuary that feels like home.",
      cta: "BOOK A VISIT",
      narrative1:
        "At Elyse Residence, we believe that a home is more than a physical space — it's a reflection of your aspirations, well-being, and values.",
      narrative2:
        "Our mission is to immerse you in a lifestyle that balances refined aesthetics, architectural excellence, and a profound sense of community.",
      pillars: [
        {
          id: 1,
          numberStr: "(1)",
          title: "HOLISTIC WELL-BEING",
          description: "Spaces designed to nurture the mind, body, and soul.",
        },
        {
          id: 2,
          numberStr: "(2)",
          title: "DISCRETION & EXCLUSIVITY",
          description: "Privacy and personal growth at the forefront.",
          hasArtwork: true,
        },
        {
          id: 3,
          numberStr: "(3)",
          title: "CULTURAL ENRICHMENT",
          description: "Celebrate local artistry, history, and traditions.",
        },
        {
          id: 4,
          numberStr: "(4)",
          title: "COMMUNITY & CONNECTION",
          description: "A welcoming environment that fosters relationships.",
        },
        {
          id: 5,
          numberStr: "(5)",
          title: "SUSTAINABLE ELEGANCE",
          description: "Luxury that respects our environment.",
        },
      ],
    },
    amenities: {
      headline: "WELLNESS-CENTERED AMENITIES",
      description:
        "From private fitness studios to guided meditation sessions, our amenities are designed to enhance your well-being and foster a sense of harmony.",
      cta: "LEARN MORE",
      gymImage: "/images/amenities-gym-v2.jpg",
      gymAlt: "Private Fitness Studio",
      corridorImage: "/images/amenities-corridor-v2.jpg",
      corridorAlt: "Sculptural Architectural Walkway",
    },
    zoomOut: {
      tag: "(OVERVIEW & SHOWCASE)",
      headline: "THE ELYSE PORTFOLIO",
      subHeadline: "Explore each facet of our architectural masterwork.",
      instruction: "Click on any section to zoom into the experience.",
    },
  },
  de: {
    nav: {
      brand: "ELYSE",
      bookVisit: "BESICHTIGUNG BUCHEN",
      menu: "MENÜ",
      close: "SCHLIEẞEN",
    },
    hero: {
      brand: "ELYSE",
      tagline: "GANZHEITLICHER LUXUS IN VOLLKOMMENER HARMONIE",
      description:
        "Willkommen in der Elyse Residence, wo zeitloses Design, wellnessorientiertes Wohnen und kulturelle Bereicherung aufeinandertreffen, um ein unvergleichliches Refugium der Eleganz zu schaffen.",
      scroll: "SCROLLEN",
    },
    about: {
      tag: "(ÜBER UNS)",
      headline: ["ZEITLOSES", "DESIGN.", "WELLNESS-", "FOKUSSIERTES", "WOHNEN."],
      paragraph1:
        "Jedes Element der Elyse Residence spiegelt das Streben nach Perfektion wider. Von der Eleganz der Innenräume bis hin zu den Annehmlichkeiten verkörpert das Anwesen ganzheitlichen Luxus.",
      paragraph2:
        "Ob Sie einen ruhigen Rückzugsort, einen kulturellen Knotenpunkt oder Raum zur persönlichen Entfaltung suchen – die Elyse Residence bietet alles.",
      cta: "MEHR ERFAHREN",
    },
    metrics: {
      livingSpace: {
        start: 70,
        end: 150,
        unit: "sq. ft.",
        suffix: "k",
        label: "akribisch gestaltete Wohnfläche.",
      },
      greenSpaces: {
        start: 37,
        end: 60,
        unit: "%",
        label: "Grünflächen für Ruhe & Wohlbefinden.",
      },
      residences: {
        start: 17,
        end: 30,
        unit: "",
        label: "exklusive Residenzen, maßgeschneidert für Komfort.",
      },
      concierge: {
        value: "24/7",
        label: "Concierge-Service für jeden Ihrer Wünsche.",
      },
    },
    projects: {
      tag: "(UNSERE PROJEKTE)",
      headline: "LUMIÈRE DUPLEX RESIDENZEN",
      description:
        "Zweistöckige Luxus-Apartments mit sonnendurchfluteten Räumen, privaten Terrassen und exklusiven Annehmlichkeiten.",
      cta: "MEHR ERFAHREN",
      items: [
        {
          id: 1,
          title: "LUMIÈRE LOUNGE & SALON",
          subtitle: "Zeitgenössisches Refugium mit maßgeschneiderter Beleuchtung",
          category: "Gemeinschaftsräume",
          area: "4.200 sq. ft.",
          bedrooms: "Privater Salon",
          price: "Auf Anfrage",
          image: "/images/project-lounge-v2.jpg",
          description: "Entworfen von renommierten Innenarchitekten.",
          features: ["Weinkeller-Verkostung", "Akustische Zonen", "Panoramafenster"],
        },
        {
          id: 2,
          title: "LUMIÈRE MASTER DUPLEX",
          subtitle: "Minimalistisches Master-Heiligtum mit edlem Walnussholz",
          category: "Private Residenz",
          area: "3.850 sq. ft.",
          bedrooms: "4 Schlafzimmer · 5 Bäder",
          price: "6.450.000 $",
          image: "/images/project-bedroom-v2.jpg",
          description: "Eine Oase ruhiger Raffinesse.",
          features: ["Walnuss-Kopfteil", "Ankleidezimmer", "Marmor-Badewanne"],
        },
        {
          id: 3,
          title: "LUMIÈRE GRAND RESIDENCE",
          subtitle: "Doppelstöckige Wohnräume mit architektonischer Eleganz",
          category: "Duplex Penthouse",
          area: "5.600 sq. ft.",
          bedrooms: "5 Schlafzimmer · 6 Bäder",
          price: "8.900.000 $",
          image: "/images/project-living-v2.jpg",
          description: "Der Höhepunkt der Elyse Residence.",
          features: ["5,5 Meter Deckenhöhe", "Gaggenau Küche", "Privater Aufzug"],
        },
      ],
    },
    beliefs: {
      tag: "(UNSERE WERTE)",
      headline: "EINE VISION DES INSPIRIERTEN LEBENS",
      subHeadline:
        "Einen bereichernden Lebensstil zu fördern, der Schönheit, Wohlbefinden und Verbundenheit harmonisiert.",
      cta: "BESICHTIGUNG BUCHEN",
      narrative1:
        "In der Elyse Residence glauben wir, dass ein Zuhause mehr ist als ein Raum — es ist ein Spiegel Ihrer Werte.",
      narrative2:
        "Unsere Mission ist es, Ihnen ein Leben in perfekter Balance zu ermöglichen.",
      pillars: [
        {
          id: 1,
          numberStr: "(1)",
          title: "GANZHEITLICHES WOHLBEFINDEN",
          description: "Räume, die Geist, Körper und Seele nähren.",
        },
        {
          id: 2,
          numberStr: "(2)",
          title: "DISKRETION & EXKLUSIVITÄT",
          description: "Privatsphäre und persönliche Entfaltung an erster Stelle.",
          hasArtwork: true,
        },
        {
          id: 3,
          numberStr: "(3)",
          title: "KULTURELLE BEREICHERUNG",
          description: "Feiern Sie lokale Kunst, Geschichte und Traditionen.",
        },
        {
          id: 4,
          numberStr: "(4)",
          title: "GEMEINSCHAFT & VERBINDUNG",
          description: "Ein einladendes Umfeld, das Beziehungen stärkt.",
        },
        {
          id: 5,
          numberStr: "(5)",
          title: "NACHHALTIGE ELEGANZ",
          description: "Luxus, der unsere Umwelt respektiert.",
        },
      ],
    },
    amenities: {
      headline: "WELLNESS-ZENTRIERTE ANNEHMLICHKEITEN",
      description:
        "Von privaten Fitnessstudios bis zu Meditationsräumen – unsere Services steigern Ihr Wohlbefinden.",
      cta: "MEHR ERFAHREN",
      gymImage: "/images/amenities-gym-v2.jpg",
      gymAlt: "Privates Fitness-Studio",
      corridorImage: "/images/amenities-corridor-v2.jpg",
      corridorAlt: "Skulpturaler Architektur-Wandelgang",
    },
    zoomOut: {
      tag: "(ÜBERSICHT & SHOWCASE)",
      headline: "DAS ELYSE PORTFOLIO",
      subHeadline: "Entdecken Sie jede Facette unseres architektonischen Meisterwerks.",
      instruction: "Klicken Sie auf einen Bereich, um einzutauchen.",
    },
  },
};
