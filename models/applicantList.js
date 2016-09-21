//
// applicants.js
//
// Handles database requests for applicant lists.
//
var mongoose = require('mongoose'),
    Applicant = mongoose.model('Applicant');

// function to handle errors - ensures we tidy up the DB
var onErr = function(err, callback) {
    console.log(err);
    mongoose.connection.close();
    callback(err);
};

// Exported function to make the search, based on Jon ID.
exports.applicantList = function(jobId, callback) {
    Applicant.find({job: jobId}, function(err, applicants) {
        if (err) {
            onErr(err, callback);
        } else {
            callback("", applicants);
        }
    });
};

