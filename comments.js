// Create web server with Node.js
// Run: node comments.js
// In browser: localhost:3000

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];
var server = http.createServer(function(request, response) {
  var parseUrl = url.parse(request.url, true);
  var pathName = parseUrl.pathname;
  var query = parseUrl.query;
  var method = request.method;

  if (pathName === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('File not found');
      } else {
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(data);
      }
    });
  } else if (pathName === '/comments') {
    if (method === 'GET') {
      response.end(JSON.stringify(comments));
    } else if (method === 'POST') {
      var str = '';
      request.on('data', function(chunk) {
        str += chunk;
      });
      request.on('end', function() {
        var comment = JSON.parse(str);
        comment.dateTime = '2017-11-5 18:00:00';
        comments.push(comment);
        response.end(JSON.stringify(comment));
      });
    }
  } else {
    fs.readFile('.' + pathName, function(err, data) {
      if (err) {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('File not found');
      } else {
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(data);
      }
    });
  }
});

server.listen(3000, function() {
  console.log('server is running...');
});
