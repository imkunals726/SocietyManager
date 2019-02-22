var express = require( 'express' );
var mongoose = require( 'mongoose'   );


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

app.get( '/new' , function( req , res ){
	res.render( 'new' );
})

app.listen(port, host, function(){
    console.log("Server has started!!!");
});