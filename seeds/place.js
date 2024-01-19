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
      price: "$25",
      description:
        "Iconic iron lattice structure in Paris, offering breathtaking views of the city.",
      location: "Paris, France",
    },
    {
      title: "Grand Canyon",
      price: "$20",
      description:
        "Magnificent natural wonder with deep canyons and stunning rock formations.",
      location: "Arizona, USA",
    },
    {
      title: "Machu Picchu",
      price: "$30",
      description:
        "Ancient Incan citadel nestled high in the Andes, known for its archaeological significance.",
      location: "Cusco Region, Peru",
    },
    {
      title: "Great Barrier Reef",
      price: "$40",
      description:
        "World's largest coral reef system, home to diverse marine life and vibrant coral formations.",
      location: "Queensland, Australia",
    },
    {
      title: "Tokyo Disneyland",
      price: "$55",
      description:
        "Magical theme park with attractions inspired by Disney characters, a favorite for families.",
      location: "Tokyo, Japan",
    },
    {
      title: "Serengeti National Park",
      price: "$35",
      description:
        "Vast wildlife reserve in Tanzania, renowned for the annual migration of wildebeest and zebras.",
      location: "Tanzania",
    },
    {
      title: "Taj Mahal",
      price: "$22",
      description:
        "Majestic marble mausoleum, a symbol of eternal love, located in Agra.",
      location: "Uttar Pradesh, India",
    },
    {
      title: "The Colosseum",
      price: "$28",
      description:
        "Ancient amphitheater in Rome, known for gladiator contests and historic significance.",
      location: "Rome, Italy",
    },
    {
      title: "Banff National Park",
      price: "$32",
      description:
        "Canadian Rockies gem offering stunning mountain scenery, lakes, and wildlife.",
      location: "Alberta, Canada",
    },
    {
      title: "Petra",
      price: "$26",
      description:
        "Historical city carved into rose-red cliffs of southern Jordan, a UNESCO World Heritage Site.",
      location: "Ma'an Governorate, Jordan",
    },
    {
      title: "Sydney Opera House",
      price: "$45",
      description:
        "Architectural marvel and iconic performing arts venue on Sydney's harbor.",
      location: "Sydney, Australia",
    },
    {
      title: "Yellowstone National Park",
      price: "$38",
      description:
        "First national park in the world, known for geothermal wonders and diverse wildlife.",
      location: "Wyoming, USA",
    },
    {
      title: "Dubai Burj Khalifa",
      price: "$50",
      description:
        "Tallest building in the world, dominating the skyline of Dubai.",
      location: "Dubai, United Arab Emirates",
    },
    {
      title: "The Louvre",
      price: "$18",
      description:
        "World's largest art museum and historic monument in Paris, home to thousands of artworks.",
      location: "Paris, France",
    },
    {
      title: "Victoria Falls",
      price: "$30",
      description:
        "Majestic waterfall on the Zambezi River, bordering Zambia and Zimbabwe.",
      location: "Livingstone, Zambia",
    },
    {
      title: "Antelope Canyon",
      price: "$25",
      description:
        "Narrow slot canyon with stunning rock formations and light beams.",
      location: "Arizona, USA",
    },
    {
      title: "Marrakech Medina",
      price: "$22",
      description:
        "Historic walled city with vibrant markets, palaces, and gardens in Morocco.",
      location: "Marrakech, Morocco",
    },
    {
      title: "Giza Pyramids",
      price: "$24",
      description:
        "Ancient Egyptian structures including the Great Pyramid of Giza and Sphinx.",
      location: "Giza, Egypt",
    },
    {
      title: "Galápagos Islands",
      price: "$55",
      description:
        "Archipelago of volcanic islands, known for unique wildlife and Charles Darwin's studies.",
      location: "Ecuador",
    },
    {
      title: "Banff National Park",
      price: "$32",
      description:
        "Canadian Rockies gem offering stunning mountain scenery, lakes, and wildlife.",
      location: "Alberta, Canada",
    },
  ];

  try {
    await Place.deleteMany({});
    await Place.insertMany(places);
    console.log("Data saved successfully");
  } catch (err) {
    console.log("An error occured while saving data");
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();
