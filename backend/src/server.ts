import 'dotenv/config';
import app from './app';
import connectToDatabase from './models/connection';

const PORT = process.env.PORT || 3001;

const apiRunning = () => {
  app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
};

const errorsCatch = (error: Error) => {
  console.log('Connection with database generated an error:\r\n');
  console.error(error);
  console.log('\r\nServer initialization cancelled');
  process.exit(0);
};

connectToDatabase().then(apiRunning).catch(errorsCatch);
