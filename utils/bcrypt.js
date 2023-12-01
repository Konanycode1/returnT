import bcrypt,{hash, compare} from 'bcrypt';


export const hashMdp = async (pass)=>{
	return await hash(pass, await bcrypt.genSalt(10));
}

export const compareMdp = (to, end)=>{

	try{

		return compare(to,end)
	}
	catch(e){
		console.log(`Erreur USER: ${e.message}`)
	}
}