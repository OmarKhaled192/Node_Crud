const express = require('express'),
      router = express.Router(),
      eventApiController = require('../app/controllers/eventsapi.controller');

// export router
module.exports = router;

//localhost:3000/api/events
router.get('/events', eventApiController.showAllEvents);
//Add new Event 
router.post('/create', eventApiController.store);

//update event
router.patch('/:id', eventApiController.getEvent, eventApiController.update)

//show single event
//localhost:3000/api/:id 
router.get("/:id", eventApiController.getEvent , eventApiController.showSingleEvent);

//delete Event 
router.delete("/:id", eventApiController.getEvent , eventApiController.deleteEvent);