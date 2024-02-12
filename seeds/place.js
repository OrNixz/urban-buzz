const mongoose = require("mongoose");
const Place = require("../models/place");

mongoose
  .connect("mongodb://127.0.0.1/urbanbuzz")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlaces() {
  const places = [
    {
      title: "Eiffel Tower",
      price: 25,
      description:
        "Iconic iron lattice structure in Paris, offering breathtaking views of the city.",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWlmZmVsJTIwdG93ZXJ8ZW58MHwwfDB8fHww",
    },
    {
      title: "Grand Canyon",
      price: 20,
      description:
        "Magnificent natural wonder with deep canyons and stunning rock formations.",
      location: "Arizona, USA",
      image:
        "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Machu Picchu",
      price: 30,
      description:
        "Ancient Incan citadel nestled high in the Andes, known for its archaeological significance.",
      location: "Cusco Region, Peru",
      image:
        "https://images.unsplash.com/photo-1589087575290-519f528dfe5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Great Barrier Reef",
      price: 40,
      description:
        "World's largest coral reef system, home to diverse marine life and vibrant coral formations.",
      location: "Queensland, Australia",
      image:
        "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Tokyo Disneyland",
      price: 55,
      description:
        "Magical theme park with attractions inspired by Disney characters, a favorite for families.",
      location: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Serengeti National Park",
      price: 35,
      description:
        "Vast wildlife reserve in Tanzania, renowned for the annual migration of wildebeest and zebras.",
      location: "Tanzania",
      image:
        "https://images.unsplash.com/photo-1528275646751-ff237d1cd935?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Taj Mahal",
      price: 22,
      description:
        "Majestic marble mausoleum, a symbol of eternal love, located in Agra.",
      location: "Uttar Pradesh, India",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The Colosseum",
      price: 28,
      description:
        "Ancient amphitheater in Rome, known for gladiator contests and historic significance.",
      location: "Rome, Italy",
      image:
        "https://images.unsplash.com/photo-1602619026153-0a2e22f2b84b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Banff National Park",
      price: 32,
      description:
        "Canadian Rockies gem offering stunning mountain scenery, lakes, and wildlife.",
      location: "Alberta, Canada",
      image:
        "https://images.unsplash.com/photo-1561134643-668f9057cce4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Petra",
      price: 26,
      description:
        "Historical city carved into rose-red cliffs of southern Jordan, a UNESCO World Heritage Site.",
      location: "Ma'an Governorate, Jordan",
      image:
        "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sydney Opera House",
      price: 45,
      description:
        "Architectural marvel and iconic performing arts venue on Sydney's harbor.",
      location: "Sydney, Australia",
      image:
        "https://images.unsplash.com/photo-1540448051910-09cfadd5df61?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Yellowstone National Park",
      price: 38,
      description:
        "First national park in the world, known for geothermal wonders and diverse wildlife.",
      location: "Wyoming, USA",
      image:
        "https://images.unsplash.com/photo-1594073632422-ef9768f87fa4?q=80&w=1743&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Dubai Burj Khalifa",
      price: 50,
      description:
        "Tallest building in the world, dominating the skyline of Dubai.",
      location: "Dubai, United Arab Emirates",
      image:
        "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The Louvre",
      price: 18,
      description:
        "World's largest art museum and historic monument in Paris, home to thousands of artworks.",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1499634231146-3393ed854a33?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Victoria Falls",
      price: 30,
      description:
        "Majestic waterfall on the Zambezi River, bordering Zambia and Zimbabwe.",
      location: "Livingstone, Zambia",
      image:
        "https://images.unsplash.com/photo-1619029383069-21d494034ed7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Antelope Canyon",
      price: 25,
      description:
        "Narrow slot canyon with stunning rock formations and light beams.",
      location: "Arizona, USA",
      image:
        "https://images.unsplash.com/photo-1597673814716-4a1e58a1f6af?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Marrakech Medina",
      price: 22,
      description:
        "Historic walled city with vibrant markets, palaces, and gardens in Morocco.",
      location: "Marrakech, Morocco",
      image:
        "https://images.unsplash.com/photo-1589008591357-0f2873177002?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Giza Pyramids",
      price: 24,
      description:
        "Ancient Egyptian structures including the Great Pyramid of Giza and Sphinx.",
      location: "Giza, Egypt",
      image:
        "https://images.unsplash.com/photo-1600520611035-84157ad4084d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Galápagos Islands",
      price: 55,
      description:
        "Archipelago of volcanic islands, known for unique wildlife and Charles Darwin's studies.",
      location: "Ecuador",
      image:
        "https://images.unsplash.com/photo-1581875598938-cac706391c98?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Great Wall of China",
      price: 40,
      description:
        "Ancient wall spanning thousands of miles, built to protect China from invaders.",
      location: "China",
      image:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  try {
    const newPlace = places.map((place) => {
      return {
        ...place,
        author: "65b9e0250f8b37a77e5aa929",
        images: {
          url: "public\\images\\image-1707719823546-59.jpg",
          filename: "image-1707719823546-59.JPG",
        },
      };
    });
    await Place.deleteMany({});
    await Place.insertMany(newPlace);
    console.log("Data saved successfully");
  } catch (err) {
    console.log("An error occured while saving data");
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();
