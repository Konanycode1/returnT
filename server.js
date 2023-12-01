import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import path from 'path'
import {connectDB} from './config/db.js'

const app = express();
config({
	path:path.join(process.cwd(), 'env')
});
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use('/images',express.static(path.join(__dirname,'images')))

connectDB()
.then(()=>{
	app.listen(1212,()=>{
		console.log("server run !!!")
	})
})
.catch((e)=>{
	console.log(`Erreur server:${e.message}`)
})