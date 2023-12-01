import posts from '../models/post.js';
import user from '../models/user.js';
import like from '../models/like.js';
import comments from '../models/comments.js';


class POST{
	static async create(req,res){
		const {_id} = req.auth;
		const userExist = user.findById(_id);
		if(!userExist){
			res.status(404)
			.json({
				statut:false,
				message:"User introuvable"
			})
			return
		}
		const postcre = await posts.create({
			...req.body
		})
		await userExist.updateOne({postid: postcre._id})
		res.status(201)
			.json({
				statut:true,
				message:"Post crée"
			})
			

	}
	static async update(req,res){

		const {_id} = req.auth;
		const {_id} = req.params;
		const userExist = await user.findById(_id);
		const postExist = await posts.findById(_id);
		if(!userExist){
			res.status(404)
			.json({
				statut:false,
				message:"User introuvable"
			})
			return
		}
		if(!postExist){
			res.status(404)
			.json({
				statut:false,
				message:"post introuvable"
			})
			return
		}

		await postExist.updateOne({...req.body});
		res.status(200)
			.json({
				statut:true,
				message:"modification effectuée avec succès"
			})
		
	}
	static async delete(req,res){
		try{
			const {_id} = req.auth;
			const {_id} = req.params;
			const userExist = await user.findById(_id);
			const postExist = await posts.findById(_id);
			if(!userExist){
				res.status(404)
				.json({
					statut:false,
					message:"User introuvable"
				})
				return
			}
			if(!postExist){
				res.status(404)
				.json({
					statut:false,
					message:"post introuvable"
				})
				return
			}

			await postExist.deleteOne({_id:_id});
			res.status(201)
			.json({
				statut:false,
				message:"Post modifié"
			})
		}
		catch(e){

		}
		
	}
	static async getId(req,res){
			const {_id} = req.auth;
			const {_id} = req.params;
			const userExist = await user.findById(_id);
			const postExist = await posts.findById(_id);
			if(!userExist){
				res.status(404)
				.json({
					statut:false,
					message:"User introuvable"
				})
				return
			}
			if(!postExist){
				res.status(404)
				.json({
					statut:false,
					message:"post introuvable"
				})
				return
			}
			res.status(200).json({
				statut: true,
				data: postExist
			})

		
	}
	static async getAll(req,res){
		const postExist = await posts.find();
		res.status(200)
		.json({
			statut:true,
			data: postExist
		})
	}
}
export default POST