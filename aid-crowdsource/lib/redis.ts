import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;

if (process.env.NODE_ENV === 'development') {
  redisClient = createClient();
} else {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error('Invalid/Missing environment variable: "REDIS_URL"') 
  } else {
    redisClient = createClient({
      url
    })
  }

}

redisClient
  .on("error", err => {
    console.log(`Redis client not connected to server: ${err}`)
  })
  .connect();

export default redisClient;