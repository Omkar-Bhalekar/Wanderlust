# 🌍 Wanderlust

A full-stack travel listing web application where users can explore, create, and review travel destinations. Built with Node.js, Express, MongoDB, and EJS.

---

## ✨ Features

- 🏠 Browse travel listings from around the world
- ➕ Create, edit, and delete your own listings
- ⭐ Leave reviews on listings
- 🔐 User authentication — register, login, and logout
- 🛡️ Authorization — only listing/review owners can modify or delete their content
- ⚠️ Flash messages for user feedback
- ✅ Server-side schema validation

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Backend    | Node.js, Express.js                  |
| Templating | EJS, EJS-Mate (layouts)              |
| Database   | MongoDB, Mongoose                    |
| Auth       | Passport.js, express-session         |
| Styling    | Tailwind CSS                         |
| Validation | Joi                                  |

---

## 📁 Project Structure

```
Wanderlust/
├── init/               # Database seed data
│   ├── data.js
│   └── index.js
├── models/             # Mongoose models
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── public/             # Static assets
│   └── css/
│       ├── input.css
│       └── output.css
├── routes/             # Express route handlers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── utils/              # Utility helpers
│   ├── ExpressError.js
│   ├── isLoggedIn.js
│   ├── schemaValidation.js
│   └── wrapAsync.js
├── views/              # EJS templates
│   ├── includes/       # Navbar, footer, flash
│   ├── layouts/        # Boilerplate layout
│   ├── listings/       # Listing pages
│   └── users/          # Login & signup pages
├── app.js              # Main application entry point
├── package.json
└── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omkar-Bhalekar/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```

4. **(Optional) Seed the database**
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. Open your browser and visit `http://localhost:8080`

---

## 🙋‍♂️ Author

**Omkar Bhalekar**
- GitHub: [@Omkar-Bhalekar](https://github.com/Omkar-Bhalekar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
