const mongoose = require("mongoose");
const Place = require("../models/place");
const hereMaps = require("../utils/hereMaps");

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
  ];

  try {
    const geoDataPromises = places.map(async (place) => {
      try {
        return await hereMaps.geometry(place.location);
      } catch (error) {
        console.error("Error fetching geodata for", place.title, error);
        // Use a fallback geodata (e.g., placeholder coordinates)
        return {
          type: "Point",
          coordinates: [116.4074, 39.9042],
        };
      }
    });

    const geoData = await Promise.all(geoDataPromises);

    await Place.deleteMany({});
    const newPlaces = [];
    for (let i = 0; i < places.length; i++) {
      // Check if geodata exists before accessing properties
      if (geoData[i]) {
        newPlaces.push({
          ...places[i],
          author: "65b9e0250f8b37a77e5aa929",
          images: {
            url: "public\\images\\image-1707719823546-59.jpg",
            filename: "image-1707719823546-59.JPG",
          },
          geometry: geoData[i],
        });
      } else {
        console.error("Missing geodata for", place.title, "- using fallback");
      }
    }
    await Place.insertMany(newPlaces);
    console.log("Data saved successfully");
  } catch (err) {
    console.error("Error saving data:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedPlaces();
