const path=require('path');
const express=require('express');
const exphbs=require('express-handlebars');
var MongoClient=require('mongodb').MongoClient;

const app=express();

app.engine('.hbs',exphbs({
	defaultLayout:'main',
	extname:'.hbs',
	layoutsDir:path.join(__dirname,'views/layouts')
}))

app.set('view engine','.hbs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));




app.get('/',(req,res) => {
	var url='mongodb://localhost:27017/chat';
	MongoClient.connect(url,function(err,db){
		var collection=db.collection('messages');
		collection.find({}).toArray(function(err,docs){
			var data={};
			data.messages=docs;
			res.render('index',data);
		})
		db.close();
	})
})

app.listen(3000);