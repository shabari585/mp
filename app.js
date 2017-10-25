// Importing modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


const app = express();
// port
const port = 3700;

// cors
app.use(cors());

app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const users = require('./routes/users');
const admin = require('./routes/admin');

app.use('/users', users);
app.use('/admin', admin);



// Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('Server logged on ' + port);
});

// app.use(function(req, res, next){
//   var d = res.status(404);
//      if(d){
//          res.sendfile(path.join(__dirname, 'public'));
//      }
// });

// Mongoose
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database);
});
// Display error if any
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error' + err);
    }
});
app.get('*', (req, res,next) => {
    // res.sendFile(express.static(path.join(__dirname, 'public')));
    // res.redirect('/');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});







