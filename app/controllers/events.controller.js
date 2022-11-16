const { model } = require("mongoose")
  let errors = [];
//Grap Event Model
const Event = require('../models/event');
var flash = require('connect-flash');

// Home Page :
function index(req, res) {
  res.render('pages/index.ejs', {headingTitle : "Home Page"})
}

// Show Events
function ShowEvents(req,res) {
  // find events
    Event.find((err, events) => {
      if(err) throw err;
      // render page with events  
      res.render('pages/events.ejs', {headingTitle: "Events Page", events})
    })  
}

// show single event:
function show(req, res) {
  //find single events
  Event.findOne({_id :req.params.id}, (err, event) => {
   // Event.findById(req.params.id, (err, event) => {
      if(err) console.log(err.message)
  //render show.ejs with events 
      res.render('pages/show.ejs', {headingTitle:"Show Single event", event, message : req.flash('info') });
    })
}
let myEvent = {}
// create function to render create page 
function create(req, res) {
  myEvent.title = ''
  myEvent.price = ''
  myEvent.description = ''
  res.render('pages/create.ejs', {headingTitle: "Create Event" , message : req.flash('info'),myEvent : myEvent});
}
// function to save data from form 
function store(req,res) {
  // fetch form data
    const event = new Event ({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description
    })
    myEvent = event;
      if(req.body.title == '' || req.body.price == ''|| req.body.description == '')
      {
        // errors.push("All Fields required ");
        req.flash('info', 'All Fields required');
        res.render('pages/create.ejs', { headingTitle: "Warning !", myEvent, message : req.flash('info')});
      }
      else if (req.body.price <500) {
        // errors.push("Price Must be greater than 500 ");
        req.flash('info', 'Price Must be greater than 500');
        res.render('pages/create.ejs', { headingTitle: "Warning !",  myEvent , message : req.flash('info')});
      }
      else {
  // save into events collection
    event.save((err) => {console.log(err)})
  // redirect events
    res.redirect('/events');

  }
}

// Update Event 
async function edit(req, res) {
  // find event 
  Event.findOne({_id : req.params.id}, (err, event) =>{
    if(err) console.log(err.message);

    res.render('pages/edit.ejs' , { headingTitle: "Update Event" , event ,errors, message : req.flash('info')})
  })
}

async function update(req, res) {
  //find Event 
  Event.findOne({_id: req.params.id}, (err, event) => {
    
     
    if(req.body.title == '' || req.body.price == ''|| req.body.description == '')
      {
        // errors.push("All Fields required ");
        req.flash('info', 'All Fields required');
        res.redirect(`/events/${req.params.id}/edit`)
      }
      else if (req.body.price <500) {
        // errors.push("Price Must be greater than 500 ");
        req.flash('info', 'Price Must be greater than 500');
        res.redirect(`/events/${req.params.id}/edit`)

      }
    else {
      event.title = req.body.title;;
      event.price = req.body.price;
      event.description = req.body.description;
      // save data 
      event.save((err) => console.log(err));
      // errors.length = 0;
      // redirect /events 
      res.redirect('/events');
}
  });
}

//delete single event 
function destroy(req,res) {
  // find event
  const event = Event.find({_id : req.params.id});
  // delete event
  event.deleteOne((err) =>{ if(err) console.log(err)});
  // redirect events
  res.redirect('/events')
}

module.exports = {
  index,
  ShowEvents,
  // showAllEvents
  show,
  create,
  store,
  destroy,
  edit,
  update
}