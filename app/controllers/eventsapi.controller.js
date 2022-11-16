const Event = require('../models/event')

// simple way for creating json format
async function showAllEvents(req, res) {
  try {
    const events = await Event.find({});
    res.json(events); // to use json format must define middleware in server.js
  } catch (err) {
    // res.status(500).json({message : err.message});
    //or
    console.log(err.message)
  }
}


//best practise & common way for creating json format 
async function getEvent(req, res, next) {
  let event ; 
  try {
    event = await Event.findById(req.params.id);
    if(event === null) {
      return res.status(404).json({ message : 'Error 404 Event not found'})
    }
  } catch (err) {
    return res.status(500).json({message : err.message});
  }
  res.event = event;
  next(); // to attach this function with next fun in the route
}

// show single Events 
function showSingleEvent(req, res) {
  res.json(res.event); 
}

// delete event 
async function deleteEvent(req, res) {
  try {
    await res.event.remove();
    res.json({ message: 'Event Deleted Successfully' })
  } catch(err) {
    res.status(500).json({message : err.message});
  }
}

// Insert One 
async function store(req, res) {
  //Creating One 
  const event = new Event({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description
  })
  try {
    const addEvent = await event.save();
    res.status(201).json(addEvent);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

// update event 
async function update(req, res) {
  if(req.body.title != null) {
    res.event.title = req.body.title;
  }
  if(req.body.price != null) {
    res.event.price = req.body.price;
  }
    if(req.body.description != null) {
    res.event.description = req.body.description;
  }
  try {
      const updatedDvent = await res.event.save();
      res.json(updatedDvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  showAllEvents,
  getEvent,
  showSingleEvent,
  deleteEvent,
  store,
  update
};
