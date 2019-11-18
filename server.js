var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')
//var mongo = require('mongodb')
var db, uri = "mongodb+srv://yaminkhan017:@Yamin287232@cluster0-95fpq.mongodb.net/test?retryWrites=true&w=majority"
var mongoose = require('mongoose')

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('error',function(err){
  console.log('could not connect to MongoDB')

})

//
// mongo.MongoClient.connect(uri,
//   {useNewUrlParser:true, useUnifiedTopology:true},function(err,client){
//     if(err){
//       console.log('could not connect to MongoDB')
//     }else{
//       db = client.db('node-cw9')
//     }
//   })

// var save = function(form_data){
//   db.createCollection('articles',function(err, co){})
//   var collection = db.collection('articles')
//   collection.save(form_data)
// }

var Schema = mongoose.Schema
var articleSchema = new Schema(
  {
    title: {
      type:String,
      required: "Title is required"
    },
    content:{
      type:String,
      required: "Content is required"
    }
  }
)

var Article = mongoose.model('Article', articleSchema)

app.use(bodyParser.urlencoded({extended:true}))

let articles = []

app.post('/submit',function(request,response){
  //save(request.body)
  let article = new Article(request.body)
  article.save(function(err,data){
    if(err){
          response.status(400).json({msg:"All fiels are require"})
    }
    response.status(200).json({article:data})
  })
  //articles.push(request.body)
  //console.log(articles)
 
}) 

app.get('/article/:index',function(request,response){
 if(request.params.index){
   //response.json(articles[request.params])
   //response.render('article.ejs',{article:articles[request.params.index]})
   Article.find({'_id': request.params.index},function(err,data){
     if(err){
       console.log(err)
       return response.status(400).json({msg:'could not not query the id'})

     }
     return response.render('article.ejs',{article:data[0]})
   })
 }
 else{
   return response.json({msg:"Article not found"})
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
