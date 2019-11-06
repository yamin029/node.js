var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

app.post('/submit'),function(request,response){
  console.log(request.body)
  response.json({msg:"successfully received"})
}

app.get('/',function(request,response){
  response.sendFile(__dirname+'/index.html')
})
app.get('/second',function(request,response){
  response.sendFile(__dirname+'/second.html')
})
app.get('/new',function(request,response){
  response.sendFile(__dirname+'/form.html')
})
  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });
