import {Schema, model} from 'mongoose';

const commentsSchema = new Schema({
	libelle:{type:String, require:true},
	userId:{type: Schema.Types.ObjectId,ref:'user'},
	postId: {type:Schema.Types.ObjectId.ObjectId, ref:'post'},
	respon: [
		{
			type:Schema.Types.ObjectId.ObjectId, ref:'respon'
		}
		],
	like:[
			{
			type:Schema.Types.ObjectId.ObjectId, ref:'like'
		}
		]
	
})
export default model('comments', commentsSchema)