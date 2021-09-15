import express from "express";

import ShopController from "../controllers/ShopController";

const ShopRoutes = express.Router();

ShopRoutes.get("/", ShopController.getIndex);

ShopRoutes.get("/products", ShopController.getAllProducts);

ShopRoutes.get("/products/:productId", ShopController.getProduct);

ShopRoutes.get("/cart", ShopController.getCart);

ShopRoutes.post("/cart", ShopController.postCart);

ShopRoutes.post("/cart/delete-item", ShopController.postCartDeleteItem);

ShopRoutes.post("/create-order", ShopController.postOrder);

ShopRoutes.get("/orders", ShopController.getAllOrders);

export default ShopRoutes;
