const express = require('express'),
    router = express.Router(),
    eventsController = require("../app/controllers/events.controller")

  module.exports = router;

//Define App Routes 
//localhost:3000
router.get('/', eventsController.index);

//localhost:3000/events
//show all events 
router.get('/events', eventsController.ShowEvents);

//create routes 
router.get('/events/create', eventsController.create)
router.post('/events/create', eventsController.store)

//Update Single Event 
router.get('/events/:id/edit', eventsController.edit)
router.post('/events/:id/edit', eventsController.update)

//delete single event
router.get('/events/:id/delete', eventsController.destroy);

//show single event
router.get('/events/:id', eventsController.show);
