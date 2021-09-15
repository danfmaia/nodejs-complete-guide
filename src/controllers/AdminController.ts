import { Request, Response } from "express";

import Product from "../models/Product";
import User from "../models/User";

const AdminController = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await req.context.user.getProducts();
      res.render("admin/products", {
        path: "/admin/products",
        pageTitle: "Admin products",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAddProduct: (req: Request, res: Response) => {
    res.render("admin/edit-product", {
      path: "/admin/add-product",
      pageTitle: "Add product",
      isEditing: false,
    });
  },

  postAddProduct: async (req: Request, res: Response) => {
    try {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;

      req.context.user.createProduct({
        title,
        imageUrl,
        price,
        description,
      });
      console.log("Product created.");

      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  },

  getEditProduct: async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId;
      const products = await req.context.user.getProducts({
        where: { id: productId },
      });
      if (products.length === 0) {
        // TODO: Treat error.
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Edit product",
        isEditing: true,
        product: products[0],
      });
    } catch (error) {
      console.log(error);
    }
  },

  postEditProduct: async (req: Request, res: Response) => {
    try {
      const productId: number = req.body.productId;
      const updatedTitle: string = req.body.title;
      const updatedImageUrl: string = req.body.imageUrl;
      const updatedPrice: number = req.body.price;
      const updatedDescription: string = req.body.description;

      const productToUpdate = await Product.findByPk(productId);
      if (!productToUpdate) {
        // TODO: Treat error.
        return;
      }
      productToUpdate.title = updatedTitle;
      productToUpdate.imageUrl = updatedImageUrl;
      productToUpdate.price = updatedPrice;
      productToUpdate.description = updatedDescription;

      await productToUpdate.save();
      console.log("Product updated.");

      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  },

  postDeleteProduct: async (req: Request, res: Response) => {
    try {
      const productId = req.body.productId;
      const product = await Product.findByPk(productId);
      if (!product) {
        // TODO: Treat error.
        return;
      }
      await product.destroy();
      console.log("Product deleted.");
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  },
};

export default AdminController;
