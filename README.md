Table of Contents
# Food Ordering Web Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
       - [Prerequisites](#prerequisites)
       - [Clone the Repository](#clone-the-repository)
       - [Backend Setup](#backend-setup)
       - [Frontend Setup](#frontend-setup)
       - [Admin App Setup](#admin-app-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction
This is a full-stack food ordering web application built using the MERN stack (MongoDB, Express, React, Node.js). The application consists of a customer-facing app for ordering food and an admin app for managing orders, menu items, and more.

## Features
- User authentication and authorization
- Browse food items
- Add items to the cart and place orders
- **Stripe Payment Integration**: Secure and reliable payment processing using Stripe
- Order tracking
- Admin panel to manage menu items and orders

## Technologies Used
- **Frontend**: React.js, React Context API, React Router
- **Backend**: Node.js, Express.js
- **Payment Gateway**: Stripe
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Installation

### Prerequisites
- Node.js
- MongoDB

### Clone the Repository
```bash
git clone https://github.com/DulanjaliSenarathna/mern-food-delivery-app.git
cd mern-food-delivery-app
```

### Backend Setup
Navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```

Start the backend server:
```bash
npm run server
```

### Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the frontend server:
```bash
npm run dev
```

### Admin App Setup
Navigate to the admin directory:
```bash
cd admin
```
Install dependencies:
```bash
npm install
```
Start the admin app:
```bash
npm start
```

## Usage
- Access the customer-facing app at `http://localhost:5173`.
- Access the admin app at `http://localhost:5174`.
- Register as a new user or log in with existing credentials.
- Browse the menu, add items to the cart, and place an order.
- Pay using a dummy visa card.
- Use the admin panel to manage orders and menu items.

## Screenshots
![Screenshot 1](Screenshots\Screenshot 2024-10-13 153952.png)
![Screenshot 2](path/to/screenshot2.png)
![Screenshot 3](path/to/screenshot3.png)

## API Documentation
The API endpoints for the backend can be documented using tools like Postman or Swagger. Include endpoints for user authentication, menu items, orders, and more.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.

## Contact
For any questions or suggestions, feel free to contact me.

Happy coding!

Feel free to customize this template according to your specific project details and requirements.
