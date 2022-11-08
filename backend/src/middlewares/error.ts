import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

// Erro genérico fornecido pela trybe durante os exercícios
// source: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/03-back-end/bloco-30-mongodb-com-nodejs-e-poo/dia-02-mongoose-e-arquitetura-msc-camada-service-e-controller/src/middlewares/error.ts
const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  console.error(err, 'lugar errado');
  return res.status(500).json({ message: 'Internal Error' });
};

export default errorHandler;