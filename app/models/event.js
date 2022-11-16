const mongoose = require('mongoose'),
      Schema =  mongoose.Schema;

// Create Schema
const eventSchema = new Schema({
  title : String,
  price: Number,
  description: String
})

// Create Model
const EventModel = mongoose.model('Event', eventSchema);

//Export Model 
module.exports = EventModel;