import express from 'express';
import 'express-async-errors';
import ProductRoute from './routes/ProductRoute';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());
app.use('/produtos', ProductRoute);

app.use(errorHandler);

export default app;