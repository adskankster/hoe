/* server.js
 *
 * Runs the HOE server.
 *
 * Requires node.js to run:
 *
 * $ node server
 *
 * Also requires:
 *   express
 *   MongoDB
 *   mongoose
 *   pug (was jade)
 *
 * To connect, point to http://localhost:8899/
 *
 */

// Stack requirements
var express = require('express');
var http = require('http');
var db = require('./models/db');

// Controllers 
var applicantlist = require('./controllers/applicantList');
var applicant = require('./controllers/applicant');

// Set-up express and server 
var app = express();
app.set('port', 8899); // this should be configurable
app.set('views', __dirname + '/views');
app.set('view engine', 'pug'); 
app.locals.pretty = true; // helps in debugging rendered html

// Generic Error Response
var errHandler = function(req, res, errType, errMsg) {
    console.log("Sending Error:\n" + errType + " - " + errMsg);
    res.render('error', { ErrorType: errType, ErrorMessage: errMsg });
    res.end();
}

// node.js uncaughtException - See warning in documentation 
// for proper use of this event. If this gets triggered there
// will likely be unhelpful results for the users.
process.on('uncaughtException', (err) => {
    // Log
    console.trace("Uncaught Exception " + err);
    
    // Might have lost DB connection, so safer to end.
    console.log("Shutting down...");
    process.exit(99);
})

// Home Page - done as a render, rather than a static, despite being a static,
// as we want to use the main.pug template for consistent header, etc.
// Also, in a real application we would probably generate the list of jobs,
// but in that case, it would have a controller in the controllers dir.
var home = function(req, res) {
    res.render('home');
    res.end();
};
app.get('/', home);
app.get('/home', home);

// Routing the requests
app.get('/jobA', applicantlist.getA);
app.get('/jobB', applicantlist.getB);
app.get('/applicant', applicant.get);

// Static files - css, etc.
app.use(express.static(__dirname + '/public'));

// Generate 404 Errors - needs to be after all other routing.
app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

// -- Error Handling

// 404 
app.use(function(err, req, res, next) {
    if (err.status !== 404) {
        return next(err);
    }

    console.log("404 Error: " + req.url);
    errHandler(req, res, 
               "File Not Found",
               "Please check the address used, or contact support.");
});
    
// Other errors - treated like 500 Internal Server
app.use(function(err, req, res, next) {
    // Logging
    console.log(err.status + " Error");
    console.trace();

    // Response
    errHandler(req, res, 
            "Internal Server Error",
            "Please contact support.");
});

// ---

// 
// Finally, start the server
//
http.createServer(app).listen(app.get('port'), function() {
    console.log('HOE: listening on ' + app.get('port'));
});

