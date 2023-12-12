const dotenv = require("dotenv");

dotenv.config();

const config = {
  DB_CONNECTION_STRING: process.env.MONGODB_URI,
  JWT_TOKEN: process.env.JWT_TOKEN,
  SECRET: process.env.SECRET_KEY,
};

export default config;
