import Redis from "ioredis"
import dotenv from 'dotenv/config'

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
// await client.set('foo', 'bar');