const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Bus = require('../models/bus');

// Book a ticket
router.post('/book', async (req, res) => {
    try {
        const { user_id, bus_id, passenger_name, seat_number, journey_date } = req.body;
        const bus = await Bus.findById(bus_id);
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        if (bus.available_seats <= 0) {
            return res.status(400).json({ error: 'No seats available' });
        }
        const ticket = new Ticket({
            user_id,
            bus_id,
            passenger_name,
            seat_number,
            journey_date,
            from: bus.from,
            to: bus.to,
            fare: bus.fare
        });
        await ticket.save();
        await Bus.findByIdAndUpdate(bus_id, { $inc: { available_seats: -1 } });
        res.status(201).json({ message: 'Ticket booked successfully', ticket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('user_id', 'name email').populate('bus_id', 'bus_name bus_number');
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get tickets by user
router.get('/user/:user_id', async (req, res) => {
    try {
        const tickets = await Ticket.find({ user_id: req.params.user_id }).populate('bus_id', 'bus_name bus_number departure_time arrival_time');
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this user' });
        }
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cancel ticket
router.put('/cancel/:ticket_id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticket_id);
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        if (ticket.status === 'cancelled') {
            return res.status(400).json({ error: 'Ticket already cancelled' });
        }
        ticket.status = 'cancelled';
        await ticket.save();
        await Bus.findByIdAndUpdate(ticket.bus_id, { $inc: { available_seats: 1 } });
        res.json({ message: 'Ticket cancelled successfully', ticket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;