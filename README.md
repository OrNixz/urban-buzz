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

After getting things done, you can run the application by `nodemon app.js` (obviously you must install nodemon before) or `node app.js`.

Oh yeah, I forgot something to say, although this is optional. You can create the places and their details by typing `node seeds/place.js`, and for the images in each, you can search the uploads folder on `seeds/uploads`.


## 4. Technologies Used
- Platform and Runtime: 
   - [Node.js](https://nodejs.org/en): JavaScript runtime platform for server-side applications.
- Package Management:
   - [NPM](https://www.npmjs.com/): Package manager for installing and managing project dependencies.
- Framework: 
   - [Express](https://expressjs.com/): Web framework for Node.js.
- Database and ODM: 
   - [MongoDB](https://www.mongodb.com/): NoSQL database.
   - [Mongose](https://mongoosejs.com/): ODM for MongoDB.
- Template Engine: 
   - [EJS](https://ejs.co/): Template engine for HTML views.
- Input Validation: 
   - [Joi](https://joi.dev/): Input validation library.
- Authentication and Session Middleware: 
   - [Passport](https://www.passportjs.org/): Authentication middleware.
   - [Passport-Local-Mongoose](https://www.npmjs.com/package/passport-local-mongoose): Passport plugin for local authentication.
   - [Express Session](https://www.npmjs.com/package/express-session): Express middleware for user sessions.
   - [Connect-Flash](https://www.npmjs.com/package/connect-flash): Express middleware for flash messages.
- Other Middleware: 
   - [Method-Override](https://www.npmjs.com/package/method-override): Middleware to support HTTP methods.
   - [Multer](https://www.npmjs.com/package/multer): Middleware for file uploads.


## 5. Screenshots

### 1. Home page
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Home.png)

### 2. Register page
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Register.png)

### 3. Login page
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Login.png)

### 4. Place map location page
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Places%20map%20location.png)

### 5. Places overview page
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Places%20overview.png)

### 6. Place details and its reviews
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Place%20details%20and%20its%20reviews.png)

### 7. Place details when the user logs in
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Place%20details%20when%20the%20user%20logs%20in.png)

### 8. Add place page
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Add%20place.png)

### 9. Edit place
![](https://github.com/OrNixz/urban-buzz/blob/main/screenshots/Edit%20place.png)

## 6. Contributing
We welcome contributions to this project! If you find a bug or have suggestions for improvements, don't hesitate to submit an issue or pull request.

## 7. Credits
This project was inspired by the **belajar-membangun-aplikasi-studi-kasus-directory-listing-app** course on the Full-Stack Javascript roadmap, with a slight distinction and additional styling that suits my style. Shout out to the creator who made this project [@lunadiotic](https://github.com/lunadiotic)
