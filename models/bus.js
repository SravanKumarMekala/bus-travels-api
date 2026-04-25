const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    bus_number: {
        type: String,
        required: true,
        unique: true
    },
    bus_name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departure_time: {
        type: String,
        required: true
    },
    arrival_time: {
        type: String,
        required: true
    },
    total_seats: {
        type: Number,
        required: true
    },
    available_seats: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    bus_type: {
        type: String,
        enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
        default: 'Non-AC'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bus', busSchema);