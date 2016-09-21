// 
// applicant.js
//
// Controller for the call for a single applicant's details.
//
// Uses mongoose to connect to a mongodb database.
//

// Set-up database access and data model. See models directory.
var mongoose = require('mongoose'),
    Applicant = mongoose.model('Applicant');
var details = require('../models/applicant');

// Callback function to handle the enquiry. Exported for use by express.
exports.get = function(req, res, next) {
    // The id gets wrapped in '', so we need to remove them
    // before passing to the db.
    var queryid = req.query.id.replace(/'/g, "");

    // Database query - callback passes data onto view
    details.applicant(queryid,  function(err, applicant) {
        if (!err) {
            res.render('applicant', { details: applicant });
            res.end();
        } else {
            // Very basic error handling
            console.log(err);
            return next(err);
        }
    });
}
    
    
