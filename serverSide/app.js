
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3100);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(function(req, res, next) {
    var data = '';
    // req.rawBody = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
        console.log('onData =>'+data);
        // req.rawBody += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/ipEndStatusList', routes.ipEndStatusList);

app.post('/postStatusList', routes.postStatusList);


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
