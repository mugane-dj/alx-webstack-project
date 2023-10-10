import { createClient, RedisClientType } from "redis";
import { promisify } from "util";


class RedisClient {
    private client: RedisClientType;

    constructor() {
      this.client = createClient();
      this.client.connect();
      this.client.on("error", (error: Error) => {
        console.log(`Redis client not connected to server: ${error}`);
      });
    }

    isAlive(): boolean {
      return this.client.isReady;
    }
  
    async get(key: string): Promise<string | null> {
      try {
        const redisGet = promisify(this.client.get).bind(this.client);
        const value = await redisGet(key);
        return value;
      } catch (error) {
        throw error;
      }
    }
  
    async set(key: string, value: string, time: number): Promise<void> {
      try {
        const redisSet = promisify(this.client.set).bind(this.client);
        await redisSet(key, value);
        await this.client.expire(key, time);
      } catch (error) {
        throw error;
      }
    }
  
    async del(key: string): Promise<void> {
      try {
        const redisDel = promisify(this.client.del).bind(this.client);
        await redisDel(key);
      } catch (error) {
        throw error;  
      }
    }
  }
  
  const redisClient = new RedisClient();
  
  export default redisClient;