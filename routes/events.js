const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/events',eventsController.getEvents);
// router.post('/events', eventsController.createEvent);
// router.put('/events/:id', eventsController.updateEvent);
// router.delete('/events/:id', eventsController.deleteEvent);

module.exports = router;
