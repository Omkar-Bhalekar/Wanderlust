# 🏡 Wanderlust - Airbnb Clone

A full-stack web application inspired by Airbnb that allows users to list their properties and explore accommodations shared by others. The project demonstrates CRUD operations, authentication, session management, form validation, MongoDB relationships, and RESTful architecture using the MERN backend ecosystem.

---

## 🚀 Features

* Create, view, edit, and delete property listings
* Responsive UI using Bootstrap 5
* Server-side and client-side form validation
* Review system with ratings and comments
* Session-based authentication
* Flash messages for user feedback
* Cookie and session management
* Custom error handling
* MongoDB relationships using Mongoose
* Modular Express routing

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Frontend

* EJS
* EJS-Mate
* Bootstrap 5

### Authentication & Security

* Passport.js
* Express-Session
* Cookie-Parser

### Validation & Utilities

* JOI
* Method-Override
* Connect-Flash

---

## 📂 Project Structure

```
Wanderlust/
│── controllers/
│── models/
│── routes/
│── views/
│── public/
│── utils/
│── middleware/
│── init/
│── app.js
│── package.json
```

---

## 📌 Features Implemented

### ✅ Listing Management

* Add new listings
* View all listings
* View listing details
* Edit listings
* Delete listings

### ✅ Reviews

* Add reviews with ratings
* Delete reviews
* MongoDB relationship handling
* Cascade deletion using Mongoose middleware

### ✅ Form Validation

* Client-side validation using Bootstrap
* Server-side validation using JOI
* Custom validation middleware

### ✅ Authentication

* User registration and login
* Password hashing
* Passport.js authentication
* Session management

### ✅ Error Handling

* Custom `ExpressError` class
* Global error handler
* Async error handling using `wrapAsync`

### ✅ Middleware

* Logger middleware
* Authentication middleware
* Authorization middleware
* Validation middleware
* Flash message middleware

### ✅ Database Relationships

* Embedded documents
* Referenced documents using ObjectId
* Population with `.populate()`

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/wanderlust.git
```

Navigate to the project folder:

```bash
cd wanderlust
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure your environment variables.

Start the application:

```bash
npm start
```

Visit:

```
http://localhost:3000
```

---

## 📚 Concepts Covered

* RESTful Routing
* MVC Architecture
* CRUD Operations
* Express Middleware
* Sessions & Cookies
* Flash Messages
* Authentication with Passport.js
* Password Hashing
* Form Validation
* MongoDB Relationships
* Mongoose Middleware
* Error Handling
* Async Programming

---

## 🎯 Future Enhancements

* Image upload with Cloudinary
* Interactive maps using Mapbox
* Search and filtering
* Booking functionality
* Wishlist feature
* User profile management
* Payment gateway integration
* Admin dashboard

---

## 📖 Learning Outcomes

This project helped in understanding:

* Building full-stack web applications with Node.js and Express
* Designing RESTful APIs
* Working with MongoDB and Mongoose
* Implementing authentication and authorization
* Managing sessions and cookies
* Handling errors effectively
* Structuring scalable Express applications
* Applying server-side validation and middleware

---

## 👨‍💻 Author

**Omkar Bhalekar**

If you found this project useful, consider giving it a ⭐ on GitHub.
