function newSociety( models , data ){
	var tempSoc = new models.Society( data );
    tempSoc.save( function( err , res ){
    	if( err ){
    		console.log( 'There was an error creating the object' );
    	}else{
    		createInitialRooms( models , res );
    	}
    }
 	);
}

function createInitialRooms( models , res ){
	for( var tmpfn = 0 ; tmpfn < res.Floors ; tmpfn++ ){
		for( var tmprn = 0; tmprn < res.MaxRoomsOnFloor ; tmprn++ ){
			var room_no = tmpfn * 100 ;
			room_no 	+= tmprn
			data = { Society_Id : res._id.str , 
					Room_no : room_no,
					Resident_Name : ' ',
					Maintainance : 0,
					Room_Status : 'Unoccupied'
				};
			newRoom( models , data );
		}
	}
}

function newRoom( models , room_data ){
	var room = models.Room( room_data );
	room.save( function( err , res ){
		if( err ){
			console.log( 'Error creating room');
		}else{
			console.log( 'Successfully created room ');
		}
	});
}

module.exports = { newRoom : newRoom , newSociety : newSociety , createInitialRooms : createInitialRooms }