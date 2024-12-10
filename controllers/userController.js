// UserController class to handle HTTP requests for user related endpoints. 
class UserController {
    constructor(userService) {
        this.userService = userService; 
    }

    // Controller method to create user
    async createUser(req, res) {
        try {
            const userData = req.body;
            userData.emailVerifiedAt = new Date(); 
            
            const newUser = await this.userService.createUser(userData); 
            res.status(201).json({ message: 'User created successfully'});
        } 
        
        catch (error) {
            console.error('Error in userController handling user creation', error.message);
            res.status(400).json({message: 'Unable to create new user'}); 
        }
    }

    // Controller method to get user by email
    async getUserByEmail(req, res) {
        try {
            const { userEmail } = req.params;
            
            const user = await this.userService.getUserByEmail(userEmail);
            if(!user) {
                return res.status(404).json({error: 'User not found'}); 
            }; 

            const publicUser = {
                username: user.username,
                email: user.email,
                emailVerifiedAt: user.emailVerifiedAt,
            }

            res.status(200).json(publicUser);
        } 
        
        catch (error) {
            console.error('Error in userController handling getUserByEmail', error.message);
            res.status(400).json({message: 'Unable to find user'}); 
        }
    }

    // Controller method to get user by id
    async getUserById(req, res) {
        try {
            const { userId } = req.params;
            
            const user = await this.userService.getUserById(userId);
            if(!user) {
                return res.status(404).json({error: 'User not found'}); 
            }; 

            res.status(200).json(user);
        } 
        
        catch (error) {
            console.error('Error in userController handling getUserById', error.message);
            res.status(400).json({message: 'Unable to find user'}); 
        }
    }

    // Controller method to get all users
    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers(); 
            if(!users) {
                return res.status(404).json({error: 'No users registered'}); 
            }; 

            res.status(200).json(users);
        } 
        
        catch (error) {
            console.error('Error in userController handling getAllUsers', error.message);
            res.status(400).json({message: 'Unable to retrieve users'}); 
        }
    }

    // Controller method to update user
    async updateUser(req, res) {
        try {
            const { userId } = req.params; 
            const updatedData = req.body; 
            
            updatedData.emailVerifiedAt = new Date(); 

            const updatedUser = await this.userService.updateUser(userId, updatedData);
            if(!updatedUser) {
                return res.status(404).json({error: 'User not found'}); 
            };  

            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } 
        
        catch (error) {
            console.error('Error in userController handling updateUser', error.message);
            res.status(400).json({message: 'Unable to update user'});          
        }
    }

    // Controller method to delete user
    async deleteUser(req, res) {
        try {
            const { userId } = req.params; 

            const result = await this.userService.deleteUser(userId); 
            if(!result) {
                return res.status(404).json({error: 'User not found'}); 
            };

            res.status(200).json({ message: 'User deleted successfully' });
        } 
        
        catch (error) {
            console.error('Error in userController handling deleteUser', error.message);
            res.status(400).json({message: 'Unable to delete user'});        
        }
    }
}

export default UserController; 