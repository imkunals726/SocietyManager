var express = require( 'express' );
var mongoose = require( 'mongoose'   );

mongoose.connect( 'mongodb://localhost:27017/SocMan' , { useNewUrlParser : true } , function( err , res ){
	if( err ){
		console.log( 'Error Connecting Database ..');
	}else{
		console.log( 'Success...' );
	}
});


app 		= express( );



app.set('view engine' ,'ejs' );
app.use(express.static('/public' ) );

app.get('/' , function( req , res ){
	res.render("index");
});

app.listen(3001, 'localhost', function(){
    console.log("Server has started!!!");
});