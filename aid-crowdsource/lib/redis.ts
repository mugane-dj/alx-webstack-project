import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;

if (process.env.NODE_ENV === 'development') {
  redisClient = createClient();
} else {
  const redisHost = process.env.REDIS_HOST;
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisPort = Number(process.env.REDIS_PORT);

  if (!redisHost && !redisPassword && !redisPort) {
    throw new Error('Invalid/Missing redis host, port or password');
  }
  redisClient = createClient({
      password: redisPassword,
      socket: {
          host: redisHost,
          port: redisPort
      }
  });
}

redisClient
  .on("error", err => {
    console.log(`Redis client not connected to server: ${err}`)
  })
  .connect();

export default redisClient;