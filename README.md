HOE - Home Office Evaluation
============================

This is an application, written in javascript, that uses node.js and express to serve up data (a list of job applicants) from a mongodb database, using mongoose. The data is rendered using pug (formerly jade) and makes use of ukgov stylesheets, as well as some mxins from the ukgov_frontend_toolkit, via a sass-generated css, additional, stylesheet.

Database
--------

Install MongoDB using the approriate instructions for your system. Make sure that you also install the mongoimport tool (on some systems this is a separate install to the main MongoDB install).

Make sure the mongodb daemon is running.

Run the following command at the command prompt to install the test database:

    mongoimport --db jobs --collection applicants --drop --file ./install/applicants.json


Node.js
-------

Install node.js, using the appropriate instructions for your system.


Server
------

Start using the command:

node server


