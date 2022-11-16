//Load evironment variable:
require('dotenv').config();

// Grap Application Dependancies 
const express = require("express"),
      expressLayout = require("express-ejs-layouts"),
      session = require("express-session"),
      mongoose = require("mongoose"),
      port = process.env.PORT || 3000,
      app = express(),
      flash = require("connect-flash");


app.use(
      session({
          secret: 'secret',
          resave: false,
          saveUninitialized: true,
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
          },
        })
      );

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// set view engine and static assets 
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(expressLayout); // this Define Middle ware for static assets 


// = Database connection
mongoose.connect(process.env.DB_URI); 
const db = mongoose.connection;

// - second way for check connection
(async () => {
  await mongoose.connect(process.env.DB_URI)
  .then(() => console.log("DB2 Connection Succeded..."))
  .catch((err) => console.log(err.message));
})();


//Define MiddleWare to fetch data from user
app.use(express.urlencoded({extended: false})) // we can use 'bodyParser' here instead of express

// app.use(express.json())

//Define App Routes 
app.use(require("./routes/web"))


// Run App server
app.listen(port, () => {
  console.log(`server running on localhost:${port} \n
  ==== open your browser on https://localhost:${port} ====`)
});