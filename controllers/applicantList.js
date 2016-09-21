// 
// applicant.js
// 
// Controller for the call for applicant lists
//
// Uses mongoose to connect to a mongodb database.
//

// Set-up database access and data model. See models directory.
var mongoose = require('mongoose'),
    Applicant = mongoose.model('Applicant');
var applicants = require('../models/applicantList');

// Generic enquiry code - main difference is job searced on as each job has
// it's own view. This is a very artificial set-up to show two different
// view types for the same data.
var getlist = function(req, res, jobID, next) {
    // Callback function passes data onto view
    applicants.applicantList(jobID, function (err, list) {
        if (!err) {
            // Basic log - better to use framework logger
            console.log(list);

            // Select correct view, render and return
            var view = "job" + jobID + "ApplicantList";
            res.render(view, { names: list });
            res.end();

        } else {
            // Very basic error handling
            console.log(err);
            return next(err);
        }
    });
};

// Callback function for Job A requests. Exported for use by express
exports.getA = function(req, res, next) {
    getlist(req, res, "A", next);
};

// Callback function for Job B requests. Exported for use by express
exports.getB = function(req, res, next) {
    getlist(req, res, "B", next);
}

