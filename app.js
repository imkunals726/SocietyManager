var express 	= require( 'express' );
var mongoose 	= require( 'mongoose'   );
var bodyparser 	= require( 'body-parser' );
var models		= require( './schema/Schemas' );
var creator 	= require('./model/newObjectCreation');
var url 		= require( 'url');
var ObjectId	= require( 'mongodb' ).ObjectID;

var host = 'localhost';
var port = 3001;

app 		= express( );

mongoose.connect( "mongodb://localhost:27017/SocMan" , { useNewUrlParser : true } )


app.set('view engine' ,'ejs' );
app.use( bodyparser.urlencoded( { extended : true } ) );
app.use( bodyparser.json( ) );

app.get('/' , function( req , res ){
	models.Society.find( {} , function( err , result ){
		if( err ){
			console.log( 'error ');
		}else{
			console.log( result );
			res.render( 'index' , { Societies : result } );
		}
	}) ;
});

app.get( '/new' , function( req , res ){
		res.render( 'new' );
});

app.post( '/new' , function( req , res ){
	var tmpsociety = req.body.society;
    creator.newSociety( models , tmpsociety );
	res.redirect( "/" );
});

app.post( '/society' , function( req , res ){
	var req_id = req.query.id ;
	console.log("id was " + req_id );
	var response = models.Society.find( { _id : ObjectId( req_id ) } , function( err , response ){
		res.send( 'Hello ' + response[0]  );
	} );
	
});

app.listen(port, host, function(){
    console.log("Server has started!!!");
});