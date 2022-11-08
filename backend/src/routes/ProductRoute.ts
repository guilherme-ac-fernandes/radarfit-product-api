import { Router } from 'express';
import ProductModel from '../models/ProductModel';
import ProductService from '../services/ProductService';
import ProductController from '../controllers/ProductController';

const route = Router();

const productModel = new ProductModel();
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

route.get('/', (req, res) => productController.getAll(req, res));
route.get('/:id', (req, res) => productController.getOne(req, res));
// route.get('/query', (req, res) => productController.getByParams(req, res));
route.post('/', (req, res) => productController.create(req, res));
route.put('/:id', (req, res) => productController.update(req, res));
route.patch('/:id', (req, res) => productController.updatePartial(req, res));
route.delete('/:id', (req, res) => productController.delete(req, res));


export default route;