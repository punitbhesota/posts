# Project Documentation

## Overview
This project is a simple RESTful API for managing posts and their associated hashtags. It uses Node.js, Express, and MongoDB with Mongoose for data storage and retrieval. The project structure is organized into different directories for configuration, controllers, models, and routes.

## Project Structure 

```plaintext
posts/
    .env
    config/
        config.js
        db.js
    controllers/
        postsController.js
    index.js
    models/
        Post.js
        PostHashtags.js
        Tag.js
    package.json
    routes/
        posts.js
```

## Postman Collection
Link : https://documenter.getpostman.com/view/13766660/2sAYQajqYo

## Configuration Files
posts/config/config.js: Loads environment variables and exports configuration settings.

posts/config/db.js: Contains the function to connect to the MongoDB database using Mongoose.


## Models
posts/models/Post.js: Defines the schema and model for posts.

posts/models/PostHashtags.js: Defines the schema and model for the relationship between posts and hashtags.

posts/models/Tag.js: Defines the schema and model for tags.


## Controllers
posts/controllers/postsController.js: Contains the logic for handling requests related to posts, including creating and retrieving posts.


## Routes
posts/routes/posts.js: Defines the routes for the posts API and maps them to the corresponding controller functions.

## Entry Point
posts/index.js: The main entry point of the application. It sets up the Express server, connects to the database, and defines the routes.
Environment Variables
The project uses a .env file to manage environment variables. The following variables are required:

PORT: The port on which the server will run.
MONGODB_URI: The URI for connecting to the MongoDB database.


## Installation and Setup

1. Clone the repository.
2. Install the dependencies:
```npm install```

3. Create a .env file in the root directory and add the required environment variables.
4. Start the server.
```npm run dev```

## API Endpoints

### Health Check
GET /: Returns a message indicating that the service is up and running.

### Posts
POST /posts: Creates a new post.
Example Request Body: 
```
{
  "title": "Post Title",
  "description": "Post Description",
  "hashtags": ["tag1", "tag2"],
  "image": "base64ImageString"
}
```

GET /posts: Retrieves posts with optional filters and pagination.
Query Parameters:
    sort: Field to sort by.
    page: Page number (default: 1).
    limit: Number of posts per page (default: 10).
    keyword: Keyword to filter posts by title or description.
    tag: Tag to filter posts by.




