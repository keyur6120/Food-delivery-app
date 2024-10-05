# Food-delivery-app
A food delivery web app

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for a food delivery system.

Project Structure
The project has two main parts:

client: The front-end React application.
server: The back-end Node.js application with Express.
Getting Started
Prerequisites
Before running the project, make sure you have the following installed on your machine:

Node.js: You can download it from here.
npm: npm comes with Node.js. After installing Node.js, you can check if npm is installed by running npm -v in your terminal.
Installation
Follow these steps to set up and run the project:

Clone the repository:

bash
Copy code
git clone <repository-url>
cd fooddelivery-mern-main
Install dependencies for both the client and server:

You need to install dependencies in both the client and server directories.

For the client:

bash
Copy code
cd client
npm install
For the server:

bash
Copy code
cd ../server
npm install
Start the application:

From the root directory (fooddelivery-mern-main), run the following command:

bash
Copy code
npm run start-App
This will run both the client and server concurrently using the concurrently package.

Client: The React app will start at http://localhost:3000.
Server: The Node.js API will run on http://localhost:5000 (or the port configured in your server).
Scripts
Here’s a breakdown of the available npm scripts in the package.json:

start-App: Runs both the client and server concurrently.
start-client: Runs the front-end React app located in the client directory.
start-server: Runs the back-end Node.js API located in the server directory.
