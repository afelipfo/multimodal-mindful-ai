export interface Place {
  name: string;
  location: string;
  description: string;
  type: string;
  activities: string[];
  bestTimeToVisit?: string;
  websiteLink?: string;
  imageUrl?: string;
}

export const placesDatabase: Record<string, Place[]> = {
  happy: [
    {
      name: "Retiro Park",
      location: "Madrid, Spain",
      description: "A green oasis in the heart of Madrid, perfect for celebrating happy moments",
      type: "Urban park",
      activities: ["Walking", "Picnic", "Visit Crystal Palace", "Rowing on the pond"],
      bestTimeToVisit: "Spring and summer",
      websiteLink: "https://www.madrid.es/portales/munimadrid/es/Inicio/Cultura-ocio-y-deporte/Parques-y-jardines/Parque-del-Buen-Retiro",
      imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e"
    },
    {
      name: "La Concha Beach",
      location: "San Sebastián, Spain",
      description: "One of the most beautiful urban beaches in the world, ideal for enjoying the sun",
      type: "Beach",
      activities: ["Swimming", "Sunbathing", "Walking the promenade", "Enjoying pintxos"],
      bestTimeToVisit: "Summer",
      websiteLink: "https://www.sansebastianturismo.com/es/que-hacer/playas/playa-de-la-concha",
      imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
    },
    {
      name: "Sagrada Familia",
      location: "Barcelona, Spain",
      description: "Gaudí's masterpiece that inspires awe and joy",
      type: "Architectural monument",
      activities: ["Visit interior", "Admire facades", "Climb towers", "Photography"],
      bestTimeToVisit: "Year-round",
      websiteLink: "https://sagradafamilia.org/",
      imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4"
    },
    {
      name: "Keukenhof Gardens",
      location: "Lisse, Netherlands",
      description: "The world's most beautiful flower garden, especially tulips",
      type: "Botanical garden",
      activities: ["Admire tulips", "Photography", "Cycling", "Picnic"],
      bestTimeToVisit: "April-May",
      websiteLink: "https://keukenhof.nl/",
      imageUrl: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72"
    },
    {
      name: "Disneyland Paris",
      location: "Paris, France",
      description: "Europe's most magical place to unleash your inner child",
      type: "Theme park",
      activities: ["Rides", "Shows", "Meet Disney characters", "Shopping"],
      bestTimeToVisit: "Spring and autumn",
      websiteLink: "https://www.disneylandparis.com/",
      imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445"
    }
  ],
  sad: [
    {
      name: "Camino de Santiago",
      location: "Spain",
      description: "A pilgrimage route that offers time for reflection and inner healing",
      type: "Pilgrimage route",
      activities: ["Walking", "Meditating", "Meeting pilgrims", "Reflecting"],
      bestTimeToVisit: "Spring and autumn",
      websiteLink: "https://www.caminodesantiago.gal/",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Montserrat Monastery",
      location: "Barcelona, Spain",
      description: "A spiritual place in the mountains, perfect for contemplation",
      type: "Monastery",
      activities: ["Visit basilica", "Listen to choir", "Hiking", "Meditation"],
      bestTimeToVisit: "Year-round",
      websiteLink: "https://www.montserratvisita.com/",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "National Library",
      location: "Madrid, Spain",
      description: "A quiet refuge for reading and reflection",
      type: "Library",
      activities: ["Reading", "Studying", "Visit exhibitions", "Contemplate architecture"],
      bestTimeToVisit: "Year-round",
      websiteLink: "http://www.bne.es/",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570"
    },
    {
      name: "Royal Botanical Garden",
      location: "Madrid, Spain",
      description: "A peaceful space to connect with nature and find peace",
      type: "Botanical garden",
      activities: ["Walking", "Observing plants", "Botanical photography", "Meditation"],
      bestTimeToVisit: "Spring and autumn",
      websiteLink: "https://www.rjb.csic.es/",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b"
    },
    {
      name: "Père Lachaise Cemetery",
      location: "Paris, France",
      description: "A place of reflection on life and mortality, beautiful and serene",
      type: "Historic cemetery",
      activities: ["Walking", "Visit famous graves", "Reflecting", "Photography"],
      bestTimeToVisit: "Year-round",
      websiteLink: "https://www.pere-lachaise.com/",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    }
  ],
  angry: [
    {
      name: "Outdoor Gym",
      location: "Any city",
      description: "Spaces to release physical and mental tension through exercise",
      type: "Sports facility",
      activities: ["Exercise", "Boxing", "Running", "Functional training"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
    },
    {
      name: "Adventure Park",
      location: "Various locations",
      description: "Adventure activities to channel energy positively",
      type: "Adventure park",
      activities: ["Zip-lining", "Climbing", "Rope bridges", "Paintball"],
      bestTimeToVisit: "Spring and summer",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256"
    },
    {
      name: "Escape Room",
      location: "Urban centers",
      description: "Mental challenges that require concentration and teamwork",
      type: "Entertainment",
      activities: ["Solve puzzles", "Teamwork", "Mental challenges", "Fun"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Go-Kart Track",
      location: "Karting circuits",
      description: "Speed and adrenaline to release tension in a controlled way",
      type: "Sports activity",
      activities: ["Drive karts", "Compete", "Adrenaline", "Fun"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Rage Room",
      location: "Major cities",
      description: "Safe spaces to release anger by breaking objects in a controlled environment",
      type: "Alternative therapy",
      activities: ["Break objects", "Release tension", "Anger therapy", "Catharsis"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    }
  ],
  anxious: [
    {
      name: "Spa and Wellness Center",
      location: "Various locations",
      description: "Spaces designed for relaxation and self-care",
      type: "Wellness center",
      activities: ["Massages", "Sauna", "Jacuzzi", "Relaxation treatments"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
    },
    {
      name: "Zen Garden",
      location: "Temples and meditation centers",
      description: "Spaces designed for meditation and mental calm",
      type: "Meditative garden",
      activities: ["Meditation", "Contemplation", "Conscious breathing", "Mindfulness"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Aquarium",
      location: "Major cities",
      description: "Observing marine life has proven calming effects",
      type: "Aquarium",
      activities: ["Observe fish", "Learn about marine life", "Relaxation", "Photography"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Yoga Center",
      location: "Yoga studios",
      description: "Yoga practice to calm the mind and relax the body",
      type: "Yoga center",
      activities: ["Yoga", "Meditation", "Breathing", "Relaxation"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Forest or Natural Park",
      location: "Natural areas",
      description: "Nature has proven effects in reducing stress",
      type: "Natural space",
      activities: ["Walking", "Nature observation", "Fresh air", "Forest bathing"],
      bestTimeToVisit: "Spring and autumn",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    }
  ],
  calm: [
    {
      name: "Prado Museum",
      location: "Madrid, Spain",
      description: "A quiet space to contemplate art and culture",
      type: "Art museum",
      activities: ["Contemplate art", "Learn history", "Walk quietly", "Reflect"],
      bestTimeToVisit: "Year-round",
      websiteLink: "https://www.museodelprado.es/",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Vasconcelos Library",
      location: "Mexico City, Mexico",
      description: "An architecturally impressive library for quiet reading",
      type: "Library",
      activities: ["Reading", "Studying", "Admire architecture", "Contemplation"],
      bestTimeToVisit: "Year-round",
      websiteLink: "https://www.bibliotecavasconcelos.gob.mx/",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Aranjuez Gardens",
      location: "Aranjuez, Spain",
      description: "Royal gardens perfect for contemplative walks",
      type: "Historic garden",
      activities: ["Walking", "Contemplate gardens", "Photography", "Picnic"],
      bestTimeToVisit: "Spring and autumn",
      websiteLink: "https://www.patrimonionacional.es/real-sitio/aranjuez",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Book Café",
      location: "Book cafés",
      description: "Cozy spaces that combine reading with the ritual of coffee",
      type: "Book café",
      activities: ["Reading", "Drinking coffee", "Writing", "Contemplating"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Planetarium",
      location: "Major cities",
      description: "Contemplate the cosmos to gain perspective and serenity",
      type: "Planetarium",
      activities: ["Observe stars", "Learn astronomy", "Cosmic meditation", "Reflect"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    }
  ],
  excited: [
    {
      name: "Amusement Park",
      location: "Major cities",
      description: "Fun and adrenaline to channel positive energy",
      type: "Amusement park",
      activities: ["Roller coasters", "Games", "Shows", "Fun"],
      bestTimeToVisit: "Spring and summer",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "La Boquería Market",
      location: "Barcelona, Spain",
      description: "A vibrant market full of colors, flavors and energy",
      type: "Market",
      activities: ["Taste food", "Buy local products", "Photography", "Explore"],
      bestTimeToVisit: "Year-round",
      websiteLink: "https://www.boqueria.barcelona/",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Music Festival",
      location: "Various locations",
      description: "Musical events to celebrate and share positive energy",
      type: "Festival",
      activities: ["Listen to music", "Dancing", "Socializing", "Celebrating"],
      bestTimeToVisit: "Summer",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Water Adventure Park",
      location: "Coasts and lakes",
      description: "Water sports to channel excitement and energy",
      type: "Water park",
      activities: ["Water sports", "Swimming", "Water slides", "Aquatic fun"],
      bestTimeToVisit: "Summer",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      name: "Dance Class",
      location: "Dance studios",
      description: "Express joy and energy through movement",
      type: "Dance studio",
      activities: ["Dancing", "Learn choreography", "Socializing", "Exercise"],
      bestTimeToVisit: "Year-round",
      websiteLink: "",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    }
  ]
};