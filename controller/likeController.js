import like from '../models/like.js';
import comments from '../models/comments.js'
import user from '.../models/user.js'
import post from '.../models/post.js'

class LIKE{
	static async create(req,res){
		try{
			const {_id} = req.auth;
			const {id} = req.params;
			const userExist = await user.findById(_id);
			const postExist = await posts.findOne({_id:id});
			if(!userExist){
				res.status(404).json({
					statut:false,
					message:'User introuvable !!'
				});
				return;
			}
			if(!postExist){
				res.status(404).json({
					statut:false,
					message:'Posts introuvable !!'
				});
				return;
			}
			const likeCre = await like.create({
				nombre:1,
				postId:postExist._id
			})
			await postExist.updateOne({
				like: likeCre._id
			})
			res.status(201)
			.json({
				statut:true,
				message:'vous avez liker'
			})

		}
		catch(e){
			res.status(500).json({
				statut: false,
				message: `Erreur like: ${e.message}`
			})

		}


	}
	static async update(req,res){
		
	}
	static async delete(req,res){
		const {_id} = req.auth;
			const {id} = req.params;
			const userExist = await user.findById(_id);
			const likeExist = await posts.findOne({_id:id});
			if(!userExist){
				res.status(404).json({
					statut:false,
					message:'User introuvable !!'
				});
				return;
			}
			if(!likeExist){
				res.status(404).json({
					statut:false,
					message:'like introuvable !!'
				});
				return;
			}
			await likeExist.deleteOne();

			res.status(20)
			.json({
				statut:true,
				message:'delete'
			})

	}
	static async getId(req,res){
		
	}
	static async getAll(req,res){
		
	}
}
export default LIKE