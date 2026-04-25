const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const busRoutes = require('./routes/buses');
const ticketRoutes = require('./routes/tickets');

app.use('/users', userRoutes);
app.use('/buses', busRoutes);
app.use('/tickets', ticketRoutes);

// Root
app.get('/', (req, res) => {
    res.json({
        message: 'Government Bus Travels API is running!',
        endpoints: {
            users: '/users/register, /users/login, /users',
            buses: '/buses, /buses/search?from=city&to=city',
            tickets: '/tickets/book, /tickets, /tickets/user/:id, /tickets/cancel/:id'
        }
    });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME })
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });