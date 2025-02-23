const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        tls: true,
    }
});

redisClient.connect().catch(err => {
    console.error('Redis connection error:', err);
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

let clients = [];

module.exports = { redisClient, clients };