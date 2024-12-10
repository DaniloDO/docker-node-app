import dotenv from "dotenv"; 
import redisClient from "../config/redisClient.js";

dotenv.config();

// UserService class responsible for business logic implemented in user data
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository; 
    }

    // Creates a new user in the database
    async createUser(userData) {
        try {
            // Check if the email is already registered
            const existingUser = await this.userRepository.getUserByEmail(userData.email); 
            if(existingUser) {
                throw new Error('Email is already registered');
            }; 

            // Save the new user in the database
            const user =  await this.userRepository.createUser(userData); 
            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService creating user:', error.message);
            throw error;
        }
    }

    // Gets data from user through email
    async getUserByEmail(userEmail) {
        try {
            const cacheKey = 'docker-node-app:user-data'; 

            const cacheData = await redisClient.getClient().get(cacheKey); 
            if(cacheData) {
                console.log('Retrieve data from Redis cache');
                return JSON.parse(cacheData); 
            }

            const user =  await this.userRepository.getUserByEmail(userEmail); 

            await redisClient.getClient().set(cacheKey, JSON.stringify(user), {EX: 60*2}); 
            console.log('Data stored in Redis cache.');

            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService getting user by email:', error.message);
            throw error;
        }
    }

    // Gets data from user through id
    async getUserById(userId) {
        try {
            const cacheKey = 'docker-node-app:user-data'; 

            const cacheData = await redisClient.getClient().get(cacheKey); 
            if(cacheData) {
                console.log('Retrieve data from Redis cache');
                return JSON.parse(cacheData); 
            }

            const user =  await this.userRepository.getUserById(userId); 

            await redisClient.getClient().set(cacheKey, JSON.stringify(user), {EX: 60*2}); 
            console.log('Data stored in Redis cache.');

            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService getting user by id:', error.message);
            throw error;
        }
    }

    // Gets all available users 
    async getAllUsers() {
        try {
            const users =  await this.userRepository.getAllUsers(); 
            return users; 
        } 
        
        catch (error) {
            console.error('Error in UserService getting all users:', error.message);
            throw error;
        }
    }

    // Updates data from user through id
    async updateUser(userId, updatedData) {
        try {
            const user =  await this.userRepository.updateUser(userId, updatedData); 
            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService updating user:', error.message);
            throw error;
        }
    }

    // Deletes data from user through id
    async deleteUser(userId) {
        try {
            const result =  await this.userRepository.deleteUser(userId); 
            return result; 
        } 
        
        catch (error) {
            console.error('Error in UserService deleting user:', error.message);
            throw error;
        }
    }
}

export default UserService; 