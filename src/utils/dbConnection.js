import mongoose from "mongoose";
import config from "../configs";
import logger from "../utils/logger";

let database;

const connect = async () => {
    const MONGODB_URL = config.DB_CONNECTION_STRING;
  
    if (database) return;
  
    try {
        const connection = await mongoose.connect(MONGODB_URL);
        database = connection;
        logger.info(" Database Synced");
      } catch (err) {
        logger.error(` Database connection error: ${err.message}`);
      }
  };
  

export { connect };