var express = require( 'express' );
var mongoose = require( 'mongoose'   );

/*mongoose.connect( 'mongodb://localhost:27017/SocMan' , { useNewUrlParser : true } , function( err , res ){
	if( err ){
		console.log( 'Error Connecting Database ..');
	}else{
		console.log( 'Success...' );
	}
});


var SocietySchema = new mongoose.Schema({
	Society_id 	: number,
	Name		: string,
	Addr		: string,
	Rooms		: list,
})*/

var host = 'localhost';
var port = 3001;
var path = 'http://' + host + ':' + port

app 		= express( );
console.log( __dirname + '\\public' )
app.set('view engine' ,'ejs' );
app.use( '/public' , express.static( __dirname + '\\public' ) );

app.get('/' , function( req , res ){
	res.render("index",{ Societies : [ { Name : 'Sairatna Apt' , Addr : 'Sagarli' } , { Name : 'Sairaj' , Addr : 'Sagarli' } ] } );
});

app.listen(port, host, function(){
    console.log("Server has started!!!");
});