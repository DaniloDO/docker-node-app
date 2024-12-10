import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class RedisClient {
    constructor() {
        if(!RedisClient.instance){
            this.client = redis.createClient({
                url: process.env.DOCKER_REDIS_URL 
                // host: process.env.REDIS_HOST,
                // port: process.env.REDIS_PORT
            })

            this.client.on('error', (error) => console.error('Error connection with redis client', error));
            this.client.connect(); 

            RedisClient.instance = this; 
        }

        return RedisClient.instance; 
    }

    getClient() {
        return this.client; 
    }
}

const redisClient = new RedisClient();
Object.freeze(redisClient); 

export default redisClient;  