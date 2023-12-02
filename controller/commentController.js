import comment from '../models/comments.js'
import posts from '../models/post.js';
import user from '../models/user.js';

//La classe commentaire 

class COMMENTS{

	//méthode pour créer un commentaire
	static async create(req,res){
		const {_id} = req.auth;
		const id = req.params;
		const userExist = await user.findById(_id);
		const postExist = await posts.findById(_id);
		if(!userExist){
			res.status(404)
			.json({
					statut:false,
					message:"User introuvable"
			})
			return;
		}
		if(!postExist){
			res.status(404)
				.json({
					statut:false,
					message:"post introuvable"
			})
			return;
		}
		const commentsCre = await comment.create({
			...req.body
		})
		await postExist.updateOne({
			comments:commentsCre._id
		})
		res.status(201)
			.json({
				statut:true,
				message:"commentaire crée"
			})

	}
	//méthode pour modifier un commentaire
	static async update(req,res){
		try{

			const {_id} = req.auth;
			const id = req.params;
			const userExist = await user.findById(_id);
			const commentExist = await comment.findOne({_id:id});
			if(!userExist){
				res.status(404)
				.json({
						statut:false,
						message:"User introuvable"
				})
				return;
			}
			if(!commentExist){
				res.status(404)
					.json({
						statut:false,
						message:"commentaire introuvable"
				})
				return;
			}
			await commentExist.updateOne({
				...req.body
			})
			res.status(201)
			.json({
				statut:true,
				message:"commentaire modifié"
			})
		}
		catch(e){
			console.log(`Erreur comments: ${e.message}`)
		}
		
	}
	//méthode pour supprimer un commentaire
	static async delete(req,res){
		try{

			const {_id} = req.auth;
			const id = req.params;
			const userExist = await user.findById(_id);
			const commentExist = await comment.findOne({_id:id});
			if(!userExist){
				res.status(404)
				.json({
						statut:false,
						message:"User introuvable"
				})
				return;
			}
			if(!commentExist){
				res.status(404)
					.json({
						statut:false,
						message:"commentaire introuvable"
				})
				return;
			}
			await commentExist.deleteOne();
			res.status(200)
			.json({
				statut:true,
				message:"commentaire supprimé"
			})

		}
		catch(e){
			console.log(`Erreur comment: ${e.message}`)
		}
		
	}
	//méthode pour recupérer un commentaire avec son ID 
	static async getId(req,res){
		try{
			const {_id} = req.auth;
			const id = req.params;
			const userExist = await user.findById(_id);
			const commentExist = await comment.findOne({_id:id});
			if(!userExist){
				res.status(404)
				.json({
						statut:false,
						message:"User introuvable"
				})
				return;
			}
			if(!commentExist){
				res.status(404)
					.json({
						statut:false,
						message:"commentaire introuvable"
				})
				return;
			}

			res.status(201)
			.json({
				statut:true,
				data:commentExist
			})

		}
		catch(e){
			console.log(`Erreur comment: ${e.message}`)
		}
		
	}
	//méthode pour récuper tout les commentaire de la BD
	static async getAll(req,res){
		const commentExist = await comment.find();
		res.status(200)
		.json({
			statut:true,
			data: commentExist
		})
		
	}
}
export default COMMENTS;