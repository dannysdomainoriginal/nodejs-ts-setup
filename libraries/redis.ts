import { createClient } from "redis";
import { logger } from "./logger.js";
import "dotenv/config";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// make sure to await to ensure connection before session is initiated
export const redisInit = async () => {
  await redisClient
    .connect()
    .then(() =>
      logger.info("Redis successfully connected at " + process.env.REDIS_HOST)
    )
    .catch((err) => {
      logger.error("Redis connection error: Initiating clean exit");
      console.log(err);
      process.exit(1);
    });
};

// handle errors after connection
redisClient.on("error", (err) => {
  logger.error("Redis error detected: Initiating clean exit");
  console.log(err);
  process.exit(1);
});

export default redisClient;