var express 	= require( 'express' );
var mongoose 	= require( 'mongoose'   );
var bodyparser 	= require( 'body-parser' );
var models		= require( './schema/Schemas' )


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
	//res.render("index",{ Societies : [ { Name : 'Sairatna Apt' , Addr : 'Sagarli' } , { Name : 'Sairaj' , Addr : 'Sagarli' } ] } );
});

app.get( '/new' , function( req , res ){
		res.render( 'new' );
});

app.post( '/new' , function( req , res ){
	var tmpsociety = req.body.society;
    var tempSoc = new models.Society( req.body.society );
    tempSoc.save( function( err , res ){
    	if( err ){
    		console.log( 'There was an error creating the object' );
    	}else{
    		for( var tmpfn = 0 ; tmpfn < res.Floor ; tmpfn++ ){
    			for( var tmprn = 0; tmprn < res.MaxRoomsOnFloor ; tmprn++ ){
    				var room_no = tmpfn * 100 ;
    				room_no += tmprn
    				var room = models.Room( { Society_Id : res._id , 
    						Room_no : room_no,
    						Resident_Name : ' ',
    						Maintainance : 0,
    						Room_Status : 'Unoccupied'
    				} );
    				room.save( function( err , res ){
    					if( err ){
    						console.log( 'Error creating room');
    					}else{
    						console.log( 'Successfully created room ');
    					}
    				});
    			}
    		}
    	}
    }
 	);


	console.log( req.body.society);
	res.redirect( "/" );
});

app.listen(port, host, function(){
    console.log("Server has started!!!");
});