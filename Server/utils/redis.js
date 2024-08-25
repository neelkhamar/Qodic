const redis = require('redis');

let client = redis.createClient({ url: 'redis://127.0.0.1:6379' })

const initialiseCache = () => {
    client.connect();
}

// Handle connection events
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

const setCacheData = async (key, value) => {
    await client.set(key, JSON.stringify(value));
}

const getCacheData = async (key) => {
    const value = await client.get(key);
    return JSON.parse(value);
}

module.exports = { initialiseCache, setCacheData, getCacheData };