var mongoose 		= require( 'mongoose' );
var RoomSchema 		= new mongoose.Schema( { 
		Society_Id 		: Number ,
		Room_No			: Number ,
		Resident_name 	: String ,
		Maintainance	: Number ,
		Room_status		: String 
});

var SocietySchema 	= new mongoose.Schema({
		Name 			: String,
		Addr			: String,
		Profile_url		: String,
		Floors			: Number,
		MaxRoomsOnFloor : Number
});

var Room 		= new mongoose.model( 'Room' , RoomSchema );
var Society     = new mongoose.model( 'Society' , SocietySchema );

module.exports = { Room : Room , Society : Society }