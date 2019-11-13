var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')

var mongo = require('mongodb')
var db, uri = "mongodb+srv://yaminkhan017:@Yamin287232@cluster0-95fpq.mongodb.net/test?retryWrites=true&w=majority"
mongo.MongoClient.connect(uri,
  {useNewUrlParser:true, useUnifiedTopology:true},function(err,client){
    if(err){
      console.log('could not connect to MongoDB')
    }else{
      db = client.db('node-cw9')
    }
  })

var save = function(form_data){
  db.createCollection('articles',function(err, co){})
  var collection = db.collection('articles')
  collection.save(form_data)
}

app.use(bodyParser.urlencoded({extended:true}))

let articles = []

app.post('/submit',function(request,response){
  save(request.body)
  articles.push(request.body)
  console.log(articles)
  response.json({msg:"successfully received"})
}) 

app.get('/article/:index',function(request,response){
 if(articles[request.params.index]){
   //response.json(articles[request.params])
   response.render('article.ejs',{article:articles[request.params.index]})
 }
 else{
   response.json({msg:"Article not found"})
 }
})

app.get('/',function(request,response){
  response.sendFile(__dirname+'/views/index.html')
})
app.get('/second',function(request,response){
  response.sendFile(__dirname+'/views/second.html')
})
app.get('/new',function(request,response){
  response.sendFile(__dirname+'/views/form.html')
})
  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });
