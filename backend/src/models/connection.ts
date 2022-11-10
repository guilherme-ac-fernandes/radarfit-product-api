import mongoose from 'mongoose';
import 'dotenv/config';

const {
  MONGOHOST,
  MONGOPASSWORD,
  MONGOPORT,
  MONGOUSER,
} = process.env;

const MONGO_DB_URL = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`;

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;