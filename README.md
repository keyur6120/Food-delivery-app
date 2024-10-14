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

## Overview
This project is a comprehensive food ordering web application developed using the MERN stack, which includes MongoDB, Express, React, and Node.js. The application features a customer-facing interface for food ordering and an admin interface for managing orders and menu items.

## Features
- **User Authentication**: Secure login and registration process.
- **Menu Browsing**: Easily browse through a wide variety of food items.
- **Shopping Cart**: Add items to the cart and manage orders effortlessly.
- **Secure Payments**: Integrated payment processing with Stripe for safe transactions.
- **Order Management**: Track orders in real-time.
- **Admin Dashboard**: A dedicated admin panel for overseeing menu items and order management.

## Technologies Used
- **Frontend**: React.js, React Context API, React Router.
- **Backend**: Node.js, Express.js.
- **Payment Gateway**: Uses Stripe for payment processing.
- **Database**: MongoDB for data storage.
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Installation

### Prerequisites
- Make sure you have Node.js installed.
- MongoDB should be running on your machine or use a cloud service.


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
- Open the customer-facing application at http://localhost:3000.
- Visit the admin dashboard at http://localhost:5173.
- Sign up as a new user or log in with your existing credentials.
- Explore the menu, add items to your cart, and complete your order.
- Use a test Visa card for payment processing.
- Utilize the admin dashboard to manage orders and menu items effectively.

## Screenshots
![Screenshot 1](Screenshots/Screenshot%202024-10-13%20153952.png)
![Screenshot 2](Screenshots/Screenshot%202024-10-13%20154229.png)
![Screenshot 3](Screenshots/Screenshot%202024-10-13%20154325.png)     
![Screenshot 4](Screenshots/Screenshot%202024-10-13%20154401.png)     


## API Documentation
The backend API endpoints can be documented with tools like Postman or Swagger. Ensure you cover endpoints related to user authentication, menu items, orders, and other relevant functionalities.

## Contributing
We welcome contributions! Please fork the repository and submit a pull request with your enhancements. Be sure to adhere to the project's coding standards and include relevant tests where applicable.
