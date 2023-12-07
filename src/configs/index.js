const dotenv = require("dotenv");

dotenv.config();

const config = {
  DB_CONNECTION_STRING: process.env.MONGODB_URI,
};

export default config; 