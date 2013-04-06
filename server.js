var app = require('http').createServer(handler)
,io=require('socket.io').listen(app)
,fs=require('fs')
,path=require('path')
,url=require('url'),
mime=require('mime'),
mongo=require('mongojs'),
db=mongo.connect('PRIMES',['assignments'])

app.listen(process.env.PORT||5000);
function handler (req, res) {
	var parsed=url.parse(req.url)
	var uri=parsed.pathname
	var query=parsed.query
	uri=uri.replace(/%20/g,' ')
	console.log(uri)
	if(uri=='/'){
			uri='/main.html'
	}
	var filename = path.join(process.cwd(), uri);
	fs.readFile(filename,
		function (err, data) {
		if (err) {
			res.writeHead(404);
			return res.end('Error loading file...');			  
		}
		res.setHeader('Content-type',mime.lookup(uri));
		res.writeHead(200);
		res.end(data);
	})
}
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
io.on('connection',function(socket){
	socket.on('init',function(id){//When someone tries to get an existing assignment
		//Find it for them
		try{
			mongoId=mongo.ObjectId(id)
		}
		catch(e){//Id is invalid :(
			socket.emit('reply',false)
			return
		}
		db.assignments.find({_id:mongoId},function(e,r){
			if(r.length){
				socket.emit('reply',r[0])
			}
			else{
				socket.emit('reply',false)
			}
		})
	}).on('responding',function(response){//When someone submits a response
		//Put it in the database and give 'em a way to get back to it
		db.assignments.save({response:response},function(e,r){
			socket.emit('reply',r)
		})
	})
})
