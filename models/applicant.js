//
// applicant.js
//
// Handles database queries for a single applicant.
//
// Uses mongoose
var mongoose = require('mongoose'),
    Applicant = mongoose.model('Applicant');

// function to handle errors
var onErr = function(err, callback) {
    console.log(err);
    mongoose.connection.close();
    callback(err);
};

// Exported function to make the query based on applicant DB _id
exports.applicant = function(id, callback) {
    Applicant.findOne({ _id: id}, function(err, applicant) {
        console.log(applicant);
        if (err) {
            onErr(err, callback);
        } else {
            callback("", applicant);
        }
    });
};

