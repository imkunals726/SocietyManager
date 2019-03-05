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

app.use( express.static( __dirname + '/public' ) )
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
	
	models.Room.find( { Society_Id : ObjectId( req_id ) } , function( err , rooms ){

		console.log( rooms);
		var data = {}
		rooms.forEach( function(room){
			console.log( room );
			if(data[ 'floor ' + room.Floor_No ] == null ){
				data[ 'floor ' + room.Floor_No ] = [ room ] ;
			}else{
				data[ 'floor ' + room.Floor_No ].push( room );
			}
		});
		res.render( 'rooms_listing' , { Floors : data } );
	} );
});

app.get( '/room' , function( req , res ) {
	res.render( 'room_info' );
});

app.listen(port, host, function(){
    console.log("Server has started!!!");
});