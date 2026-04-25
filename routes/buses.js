const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search buses by from and to
router.get('/search', async (req, res) => {
    try {
        const { from, to } = req.query;
        const buses = await Bus.find({
            from: new RegExp(from, 'i'),
            to: new RegExp(to, 'i'),
            available_seats: { $gt: 0 }
        });
        if (buses.length === 0) {
            return res.status(404).json({ message: 'No buses found for this route' });
        }
        res.json(buses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single bus
router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a bus
router.post('/', async (req, res) => {
    try {
        const bus = new Bus(req.body);
        await bus.save();
        res.status(201).json(bus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update bus
router.put('/:id', async (req, res) => {
    try {
        const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete bus
router.delete('/:id', async (req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        if (!bus) return res.status(404).json({ error: 'Bus not found' });
        res.json({ message: 'Bus deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;