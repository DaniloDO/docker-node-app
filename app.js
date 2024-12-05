import express from "express";
import { dirname } from 'path'; 

const __dirname = dirname(import.meta.url);

const app = express(); 
const PORT = 3000; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('json spaces', 2); 

app.get('/', (req, res) => {

    res.status(200).json({message: 'Docker container deployed'}); 
}); 

console.log(__dirname); 

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
