var express 	= require( 'express' );
var mongoose 	= require( 'mongoose'   );
var bodyparser 	= require( 'body-parser' );
var models		= require( './schema/Schemas' );
var creator 	= require('./model/newObjectCreation');
var url 		= require( 'url');
var ObjectId	= require( 'mongodb' ).ObjectID;
var moment		= require( 'moment' );
var methodOverride = require('method-override');

var host = 'localhost';
var port = 3001;

app 		= express( );

mongoose.connect( "mongodb://localhost:27017/SocMan" , { useNewUrlParser : true } )

var public_dir = __dirname + '\\public'

app.use( express.static( public_dir ) );
app.set('views', [__dirname + '\\views', public_dir ]);
app.set('view engine' ,'ejs' );
app.use( bodyparser.urlencoded( { extended : true } ) );
app.use( bodyparser.json( ) );
app.use( methodOverride( '_method' ) );

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

//this is using the right verb
app.post( '/new' , function( req , res ){
	var tmpsociety = req.body.society;
    creator.newSociety( models , tmpsociety );
	res.redirect( "/" );
});

//this is wrong verb should be get only i won't change it now :P :)
//And i can't belive i finally changed this to get
app.get( '/society/:id' , function( req , res ){
	var req_id = req.params.id ;
	
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

// this method should be get
app.get( '/room' , function( req , res ) {

	room_id = req.query.room_id;
	console.log( req.query );
	console.log( room_id );
	today = new Date( );
	models.Maintainance.find({room_id:room_id} , function(err , response ){
		data = {}
		response.forEach( function( resp ){
			data[resp.month.toLowerCase( )] = resp.amount;
		} );
		res.render( 'room_info' ,{ room_id : room_id , Months : moment.months( ).slice( 0 , today.getMonth( ) ) , maintainance : data } );
	});
});

//this method should be update
app.put('/pay_maintainance' , function( req , res ){
	data 			= req.body.maintainance;
	data.room_id	= ObjectId( data.room_id );
	data.amount 	= Number( data.amount);

	var maint 		= models.Maintainance( data );
	maint.save( function(err , response ){
		res.redirect( '/room?room_id='+ data.room_id )
	});
});

app.listen(port, host, function(){
    console.log("Server has started!!!");
});