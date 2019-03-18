var mongoose 		= require( 'mongoose' );
var mongodb			= require('mongodb');
var RoomSchema 		= new mongoose.Schema( { 
		Society_Id 		: mongodb.ObjectId ,
		Room_No			: Number ,
		Resident_Name 	: String ,
		Maintainance	: Number ,
		Floor_No		: Number,
		Room_Status		: String ,
		Skills			: String,
		Info			: String,
		Website			: String
});

var SocietySchema 	= new mongoose.Schema({
		Name 			: String,
		Addr			: String,
		Profile_url		: String,
		Floors			: Number,
		MaxRoomsOnFloor : Number
});

var MaintainanceSchema = new mongoose.Schema({
	room_id				:mongodb.ObjectId,
	month				:String,
	year				:Number,
	amount				:Number
});



var Room 		= new mongoose.model( 'Room' , RoomSchema );
var Society     = new mongoose.model( 'Society' , SocietySchema );
var Maintainance= new mongoose.model( 'Maintainance' , MaintainanceSchema );

module.exports = { Room : Room , Society : Society , Maintainance : Maintainance }