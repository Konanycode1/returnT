import {Schema, model} from 'mongoose';

const likeSchema = new Schema({
	nombre: {type: Number, default: 0},
	postId:{type:Schema.Types.ObjectId, ref:"post"}
	
})
export default model('like', likeSchema)