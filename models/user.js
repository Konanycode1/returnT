import {Schema, model} from 'mongoose';

const userSchema = new Schema({
	nomPrenom : {type:String, requere:true},
	email : {type:String, requere:true, unique:true},
	image : {type:String, requere:true},
	contact : {type:String, requere:true, unique:true},
	linkedin : {type:String, requere:true, unique:true},
	password : {type:String, requere:true, length: 20},
	postId: [
		{
			type: Schema.Types.ObjectId, ref:'posts'
		}
		]
	

})
export default model("USER", userSchema);