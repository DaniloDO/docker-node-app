import express from "express";
import dotenv from 'dotenv';
import mongoConnection from "./database/config/mongoConfig.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config(); 

const app = express(); 
const port = process.env.PORT || 3000; 

mongoConnection; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/user', userRouter); 

app.set('json spaces', 2); 

app.get('/', (req, res) => {

    res.status(200).json({message: 'Docker container deployed'}); 
}); 

// Shuts down the server
process.on('SIGINT', () => {
    console.log('Shutting down server');
    process.exit(0);  
})

app.listen(port, () => console.log(`listening on port: ${port}`));
