## Known issue
   Please fill "first name" at last of the form submission, there is a known issue, when i generate and add any new "div" then form is getting submitted. As first name is required for contact it will stop submission.

## Installation
	npm install

## To start the server
    node app.js
	
## Configuration (database) - change in app.js file

        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'contacts'	
		
## To access the application enter below url in your browser

		http://localhost:4300/contacts

## Database setup

        run contactsSchema.sql file in your Mysql workbench
		
## Applications used

       1. MySQL Workbench 8.0 CE
	   2. Nodejs version v12.16.1
