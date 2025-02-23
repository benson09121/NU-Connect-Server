const eventsModel = require('../models/eventsModel');
const { redisClient, clients } = require('../config/redis');

async function getEvents(req, res) {
    try {
        const events = await eventsModel.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function getUpdates(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);

    req.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
    });
}

async function createEvent(req, res) {
    try {
        const { user_id, title, description, venue, date, start_time, end_time } = req.body;
        const newEvent = await eventsModel.createEvent(user_id, title, description, venue, date, start_time, end_time);
        redisClient.publish('events_update', JSON.stringify(newEvent)).catch(err => {
            console.error('Redis publish error:', err);
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

redisClient.subscribe('events_update', (message) => {
    clients.forEach(client => client.write(`data: ${message}\n\n`));
}).catch(err => {
    console.error('Redis subscribe error:', err);
});

module.exports = { getEvents, getUpdates, createEvent };
