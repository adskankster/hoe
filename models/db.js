// 
// db.js
//
// Sets up Database connection and events in one place.
//
// Database access is via mongoose to mongodb.
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/jobs';
mongoose.connect(dbURI);

// Connection Events
mongoose.connection.on('connected', function() {
    console.log('HOE db connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('HOE db connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('HOE db disconnected');
    // Baling out for simplicity's sake
    throw new Error("Database Error");
});

// Node process ends, close the db connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('HOE db disconnected due to server shutdown');
        process.exit(0);
    });
});

// Use schemas and models
require('./details');
