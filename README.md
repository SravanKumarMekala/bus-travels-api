# Government Bus Travels API 🚌

A production-ready REST API for bus ticket booking built with Node JS, Express and MongoDB.

## 🔗 Live Demo
- **API Base URL:** https://bus-travels-api.onrender.com
- **Buses:** https://bus-travels-api.onrender.com/buses
- **Users:** https://bus-travels-api.onrender.com/users
- **Tickets:** https://bus-travels-api.onrender.com/tickets

## 🛠️ Tech Stack
- **Runtime:** Node JS
- **Framework:** Express JS
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Deployment:** Render

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /buses | Get all buses |
| POST | /buses | Add a new bus |
| GET | /buses/search?from=city&to=city | Search buses by route |
| GET | /buses/:id | Get a specific bus |
| PUT | /buses/:id | Update bus details |
| DELETE | /buses/:id | Delete a bus |
| POST | /users/register | Register a user |
| POST | /users/login | Login user |
| GET | /users | Get all users |
| POST | /tickets/book | Book a ticket |
| GET | /tickets | Get all tickets |
| GET | /tickets/user/:id | Get tickets by user |
| PUT | /tickets/cancel/:id | Cancel a ticket |

## ⚙️ Run Locally
```bash
git clone https://github.com/SravanKumarMekala/bus-travels-api.git
cd bus-travels-api
npm install

# Add .env file
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=bustravelsdb
PORT=3000

npm run dev
```

## 📂 Project Structure
```
bus-travels-api/
├── models/
│   ├── user.js
│   ├── bus.js
│   └── ticket.js
├── routes/
│   ├── users.js
│   ├── buses.js
│   └── tickets.js
├── app.js
└── package.json
```