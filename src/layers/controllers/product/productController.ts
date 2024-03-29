import express, { NextFunction, Request, Response } from "express";
import { BaseController } from "../baseController";
import { ProductDataType } from "../../../types/product";
import { validateTokenMiddleware } from "../../../validation/tokenValidationMiddleware";
import {
  addProductSchema,
  deleteProductSchema,
} from "../../../schemas/zodSchemas/addProductSchema";
import {
  addProductService,
  deleteProductService,
  getAllProductsCategoriesService,
  getAllProductsService,
  updateProductService,
} from "../../services/product/productService";
const router = express.Router();

// Route to add a new product
router.post(
  "/new-product",
  validateTokenMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract product data from the request body

      const productData: ProductDataType = req.body;
      console.log(productData);

      // Extract user ID from the request

      const userId = { userId: Number(req?.user?.id) };

      console.log(userId);
      //convert price & quantity to number
      productData.price = Number(productData.price);
      productData.quantity = Number(productData.quantity);
      productData.categoryId = Number(productData.categoryId);

      // Validate the product data using the schema
      const validatedData = addProductSchema.parse(productData);

      console.log(validatedData);
      // Call the service function to add the product
      const newProduct = await addProductService({
        ...userId,
        ...validatedData,
      });

      BaseController.apiResultToStatusCode(res, newProduct);
      return res.json(newProduct);
    } catch (e) {
      next(e);
    }
  }
);

// Route to get all products
router.get(
  "/all-products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await getAllProductsService();
      BaseController.apiResultToStatusCode(res, products);
      res.json(products);
    } catch (e) {
      next(e);
    }
  }
);

// Route to get all products categories
router.get(
  "/all-product-categories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await getAllProductsCategoriesService();
      BaseController.apiResultToStatusCode(res, products);
      res.json(products);
    } catch (e) {
      next(e);
    }
  }
);

// Route to delete a product by ID
router.delete(
  "/delete-product/:product_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.product_id);

      const validatedData = deleteProductSchema.parse({ product_id: id });
      const deleted = await deleteProductService(validatedData.product_id);
      BaseController.apiResultToStatusCode(res, deleted);
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/update-product/:product_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const productData: ProductDataType = req.body;

      const updated = await updateProductService(id, productData);
      BaseController.apiResultToStatusCode(res, updated);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
