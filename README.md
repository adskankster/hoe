HOE - Home Office Evaluation
============================

This is an application, written in javascript, that uses **node.js** and **express** to serve up data (a list of job applicants) from a **MongoDB** database, using **mongoose**. The data is rendered using **pug** (formerly **jade**) and makes use of ukgov stylesheets, as well as some mxins from the ukgov_frontend_toolkit, via an additional,  **SASS**-generated css stylesheet.

Installation
------------

This application was written on a Linux system, so the instructions are likely to be specific to Linux. As all the constituent parts are cross platform, I do not anticipate them to vary by much for other OS's, but you might find the odd variation here and there. For that reason, I recommend checking the installation and configuration instructions for each framework, before installing. Assume, from here on in, that where the instruction is "install X", it should be expanded to "install X, according to the instrucions for your system".


Code
----

Create a folder on your system, navigate into it and clone the repository:

    git clone https://github.com/adskankster/hoe.git


Database
--------

Install **MongoDB** and ensure that the daemon is started.

Make sure that you also install the mongoimport tool (on some systems this is a separate install to the main MongoDB install).

From the base directory, run the following command at the command prompt to install the test database:

    mongoimport --db jobs --collection applicants --drop --file ./install/applicants.json

If you navigate into the "install" directory, you should alter the path after "--file" accordingly.

This command should install the test data and tell you that 16 records were imported. If you run it again, it drops any existing data, so you will only ever have 16 records.

The file "applicants.json" can also be used to provide a template for the data model.


Stack
-----

Install **node.js** and **npm** if it is a separate install.

Run
    npm install

to install the dependencies. This should install **express**, **jade**, **mongoose**, and **pug**. It will also install the govuk_frontend_toolkit, that will only be needed if you wish to change the style.css file, using **SASS**.

SASS
----

If you want to change the style.css file, you will need to install SASS. Then run the following command, in the \<base\>/public/stylesheets/ directory:

    sass --style expanded --line-numbers --load-path ../../node_modules/govuk_frontend_toolkit/stylesheets style.scss style.css

If you are compiling the changes for production, use:

    sass --style compressed --load-path ../../node_modules/govuk_frontend_toolkit/stylesheets style.scss style.css


Usage
------

Start using the command:

    node server


Then connect your browser to http://localhost:8899/ and you will see a home page with links to two jobs. Each job list has the same applicants, but the data is shown in a different format. If you do not see the correct page, try using 127.0.0.1 instead of localhost. Depending on network and security settings, you should also be able to view the web page from a different computer, using the server's address.


