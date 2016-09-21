//
// details.js
//
// Defines data schema and model for details of a single applicant.
//

// Uses mongoose
var mongoose = require('mongoose');

var applicantSchema = new mongoose.Schema({
    name: String,
    dob: String,
    workExperience:
        [
            {
                place:String,
                from:String,
                to:String,
                summary:String
            }
        ]
});

// Export the data model for use by the controllers
var Applicant = module.exports = mongoose.model('Applicant', applicantSchema);
