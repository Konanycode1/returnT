import {Schema,model} from 'mongoose';

const postSchema = new Schema({

	libelle: {type:String, require:true},
	userId : {type: Schema.Types.ObjectId, ref:'user'},
	comments: [
		{
			type: Schema.Types.ObjectId, ref:'comments'
		}
		]
	,
	like: [
		{
			type: Schema.Types.ObjectId, ref:'like'
		}
		]
	
})
export default model('POSTS', postSchema)