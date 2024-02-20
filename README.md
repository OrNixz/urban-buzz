# Urban Buzz

## 1. Overview

### Project Description

Urban Buzz is a comprehensive online platform designed to empower travelers with accurate, up-to-date information and insightful reviews of tourist attractions worldwide. We strive to eliminate the frustration of encountering unreliable recommendations and discrepancies in pricing, location, and other crucial details, so you can plan your dream vacation with confidence.

### Mission

Our mission is to transform the way travelers discover and experience the world. We believe that everyone deserves a seamless, well-informed travel journey, free from misinformation and unnecessary surprises.

### Vision

Urban Buzz envisions a future where travelers have a trusted resource at their fingertips, empowering them to embark on meaningful, personalized adventures. We aim to become the leading platform for authentic travel experiences, enriching lives and fostering deeper connections with diverse cultures and landscapes.

### Target Audience

Urban Buzz caters to a diverse range of travelers, including:
- Families
- Travel Enthusiasts
- Solo Adventurers

## 2. Features

- User Authentication and Authorization (allows users to register, then login with their accounts, and logout.)
- Place CRUD Operations (List, create, show, edit, update, and delete places.)
- Image Management (upload and delete images for a place, and you can upload up to five photos).
- Place Validation and Authorization (validate place data during creation and update.)
- Geolocation Handling (fetching geolocation data for a place.)
- Review Management (deleting associated reviews when a place is deleted.)
- Review Operations (create, read, and delete reviews)


## 3. Getting Started

### Prerequisites:
Before you begin, make sure you have already installed [Node.js](https://nodejs.org/), [NPM](https://www.npmjs.com/), and [MongoDB](https://www.mongodb.com/).

### Installation: 
1. Clone the repository: 
`https://github.com/OrNixz/urban-buzz.git`

2. Navigate to the project directory:
`cd your-project-name`

3. Install dependencies: 
`npm install`

### Database Setup:
Run the MongoDB server by typing `mongod` in the command prompt, and type `mongosh` to interact with the MongoDB server.

### Connection to the Database:
```
mongoose
  .connect("mongodb://127.0.0.1/urbanbuzz")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

```
