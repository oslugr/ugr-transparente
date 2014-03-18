
/**
 * Module dependencies.
 */

var express = require('express');
var transparente = require('./routes/transparente');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    res.status(404).render('404_error', {titulo: "Page not found (Error 404)", texto: "Lo siento, la página no existe o está temporalmente inaccesible"});
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', transparente.index);
app.get('/ugr',transparente.ugr)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
