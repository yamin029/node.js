var http = require('http');
var fs = require('fs')
  var server = http.createServer(function(req, res){
    

    fs.readFile('index.html', function(err,data){
        if(err){
                res.statusCode = 400;
                res.json({'err':'File not found'})
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data)
    })
    //res.end("Hello World\n");
  });
  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });
