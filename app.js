import express from "express";

const app = express(); 
const PORT = 3000; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('json spaces', 2); 

app.get('/', (req, res) => {

    res.status(200).json({message: 'Docker container deployed'}); 
}); 

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
