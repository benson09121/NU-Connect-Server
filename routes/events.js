const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/events', eventsController.getEvents);
router.get('/events/updates', eventsController.getUpdates);
router.post('/events',  eventsController.createEvent);

module.exports = router;
