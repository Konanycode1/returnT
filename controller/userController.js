import user from '../model/user.js';
import {hashMpd, compareMdp} from '../utils/bcrypt.js'
import {genToken} from '../utlis/token.js'

class USER{
	static async create(req,res){
		const {email,password,image, ...rest} = req.body;
		const userExist = await user.findOne({email:email});
		if(userExist){
			res.status(404).json({
				statut:false,
				message:"user existe!!"
			});
			return ;
		}
		await user.create({
			email:email,
			image:``,
			password: await hashMpd(password),
			...rest
		})

		res.status(201).json({
			statut: true, 
			message: 'Utilisateur crée avec succès'
		})


	}
	static async login(req,res){
		const {email, password} = req.body;
		const userExist = user.findOne({email:email});
		if(!userExist){
			res.status(404)
			.json({
				statut:false,
				message:"email introuvable"
			})
			return
		}
		if(! await compareMdp(password,userExist.password)){
			res.status(404)
			.json({
				statut:false,
				message:"mot de passe incorrect"
			})
			return
		}
		res.cookie('token', await genToken(userExist.toObject()) );
		res.status(200).json({
			statut:true,
			token: await genToken(userExist.toObject()),
			message:'connexion encours !!!'
		})


		
	}
	static async update(req,res){
		try{

			const  {_id} = req.auth;
			const {id} = req.params;
			const {image, password, ...body} = req.body

			const userExist = await user.findById(_id);
			if(!userExist || _id !== id){
				res.status(404).json({
					statut:false,
					message: 'User introuvable !!'
				});
				return;
			}
			if(image){
				userExist.updateOne({image:``,...body})

			}
			else if(password){
				userExist.updateOne({password:await hashMpd(password),...body})
			}
			else if(image,password){
				userExist.updateOne({image:``,password:await hashMpd(password),...body})
			}
			else{
				userExist.updateOne({...body})
			}

			res.status(201).json({
				status: true,
				message: 'information modifiée avec succès.'
			})
		}
		catch(e){
			res.status(500)
			.json({
				statut: false, 
				message:`erreur User: ${e.message}`
			})
		}

		
	}
	static async delete(req,res){
		try{

			const {_id} = req.auth;
			const {id} = req.params;
			const userExist = await user.findById(_id);

			if(!userExist){
				res.status(404)
				.json({
					status: false,
					message: "User introuvable !!!"
				})
				return
			}
			await userExist.deleteOne({_id: id});
			res.status(200)
			.json({
				statut:true,
				message: "votre compte sera supprimé !!!"
			})

		}
		catch(e){
			console.log(`Erreur USER: ${e.message}`)
		}
		
	}
	static async getId(req,res){
		const {_id} = req.auth;
		const userExist = await user.findById(_id);
		if(!userExist){
			res.status(404)
			.json({
				statut:false,
				message:"User introuvable !!"
			})
			return
		}
		const {password, ...rest} = userExist;
		res.status(200).json({
			statut: true,
			data:{...rest}
		})

		
	}
	static async getAll(req,res){
		const userExist = await user.find();
		res.status(200)
		.json({
			statut:true,
			data: userExist
		})
	}


}
export default USER