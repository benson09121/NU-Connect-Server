const axios = require('axios');
const eventsModel = require('../models/eventsModel');

async function getEvents(req, res) {
    try {
        const events = await eventsModel.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// async function createEvent(req, res) {
//     try {
//         const { title, description, date } = req.body;
//         const newEvent = await eventsModel.createEvent(title, description, date);
//         res.status(201).json(newEvent);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// async function updateEvent(req, res) {
//     try {
//         const { id } = req.params;
//         const { title, description, date } = req.body;
//         const updatedEvent = await eventsModel.updateEvent(id, title, description, date);
//         res.json(updatedEvent);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// async function deleteEvent(req, res) {
//     try {
//         const { id } = req.params;
//         await eventsModel.deleteEvent(id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

module.exports = { getEvents };
