import jwt, {sign, verify} from 'jsonwebtoken';

export const genToken = async (user)=>{
	try{
		const JWT_SECRET = process.env.JWT_SECRET;
		if(!JWT_SECRET) throw new Error("Code secret introuvable !!!")
		return await jwt.sign(user, JWT_SECRET, {expired: 24*3600})
	}
	catch(e){
		console.log(`erreur Token: ${e.message}`);
	}
}

export const verifyToken = async (token)=>{
		const JWT_SECRET = process.env.JWT_SECRET;
		if(!JWT_SECRET) throw new Error("Code secret introuvable !!!")

		return await jwt.verify(token, JWT_SECRET);
}