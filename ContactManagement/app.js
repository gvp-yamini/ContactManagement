
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load contacts route
var contacts = require('./routes/contacts'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.set('view engine', 'html');
//app.register('.html', require('ejs'));


//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'contacts',
        multipleStatements: true

    },'pool') //or single

);


//app.get('/',routes.index1);

app.get('/',contacts.list);
app.get('/contacts', contacts.list);
app.get('/contacts/add', contacts.add);
app.post('/contacts/add', contacts.save);
app.get('/contacts/delete/:id', contacts.delete_contact);
app.get('/phone/delete/:id', contacts.delete_phone);
app.get('/date/delete/:id', contacts.delete_date);
app.get('/address/delete/:id', contacts.delete_address);
app.get('/contacts/edit/:id', contacts.edit);
app.post('/contacts/edit/:id', contacts.save_edit);
app.post('/contacts/search/', contacts.search);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
