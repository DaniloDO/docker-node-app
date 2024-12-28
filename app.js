import express from "express";
import dotenv from 'dotenv';
import mongoConnection from "./database/config/mongoConfig.js";
import userRouter from "./routes/userRoutes.js";

const environment = process.env.NODE_ENV || "development";

dotenv.config({path: `.${environment}.env`}); 

console.log(`environment: ${environment}`);

const app = express(); 
const port = process.env.PORT || 3000; 

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('REDIS_URL:', process.env.REDIS_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CONFIRM:', process.env.CONFIRM);
console.log('PORT:', process.env.PORT);

// mongoConnection; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use('/api/user', userRouter); 

app.set('json spaces', 2); 

app.get('/', (req, res) => {

    res.status(200).json({ message: 'Docker container deployed' }); 
}); 

// Shuts down the server
process.on('SIGINT', () => {
    console.log('Shutting down server');
    process.exit(0);  
})

app.listen(port, () => console.log(`listening on port: ${port}`));
