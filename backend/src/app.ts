import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import ProductRoute from './routes/ProductRoute';
import errorHandler from './middlewares/error';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/produtos', ProductRoute);

app.use(errorHandler);

export default app;