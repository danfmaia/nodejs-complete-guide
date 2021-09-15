import express from "express";

import AdminController from "../controllers/AdminController";

const AdminRoutes = express.Router();

AdminRoutes.get("/products", AdminController.getProducts);

AdminRoutes.get("/add-product", AdminController.getAddProduct);

AdminRoutes.post("/add-product", AdminController.postAddProduct);

AdminRoutes.get("/edit-product/:productId", AdminController.getEditProduct);

AdminRoutes.post("/edit-product", AdminController.postEditProduct);

AdminRoutes.post("/delete-product", AdminController.postDeleteProduct);

export default AdminRoutes;
