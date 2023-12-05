import posts from '../models/post.js';
import user from '../models/user.js';
import like from '../models/like.js';
import comments from '../models/comments.js';

//La classe Poste

class POSTS{

	//méthode pour créer un post
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
		await userExist.updateOne({postId: postcre._id})
		res.status(201)
			.json({
				statut:true,
				message:"Post crée"
			})
			

	}
	//méthode pour modifier un post
	static async update(req,res){

		const {_id} = req.auth;
		const {id} = req.params;
		const userExist = await user.findById(_id);
		const postExist = await posts.findOne({_id:id});
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
	//méthode pour supprimer un post
	static async delete(req,res){
		try{
			const {_id} = req.auth;
			const {id} = req.params;
			const userExist = await user.findById(_id);
			const postExist = await posts.findOne({_id:id});
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
	//méthode pour récupérer un post en fonction de son ID
	static async getId(req,res){
			const {_id} = req.auth;
			const {id} = req.params;
			const userExist = await user.findById(_id);
			const postExist = await posts.findOne({_id:id});
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
	//méthode pour récupérer un post en fonction de l'utilisateur
	static async getIdUser(req,res){
			const {_id} = req.auth;
			const {id} = req.params;
			const userExist = await user.findById(_id);
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

	//méthode pour récupérer tout les posts
	static async getAll(req,res){
		const postExist = await posts.find();
		res.status(200)
		.json({
			statut:true,
			data: postExist
		})
	}
}
export default POSTS