import { Request, Response } from "express";

import Product from "../models/Product";
import { CartItemOutput } from "../models/CartItem";

const ShopController = {
  getIndex: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      res.render("shop/products", {
        path: "/products",
        pageTitle: "Admin products",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getProduct: async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.productId;
      const product = await Product.findByPk(productId);
      if (!product) {
        // TODO: Treat error.
        return;
      }
      res.render("shop/product-detail", {
        path: "/products",
        pageTitle: product.title,
        product,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getCart: async (req: Request, res: Response) => {
    try {
      const cart = await req.context.user.getCart();
      const products = await cart.getProducts();
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your cart",
        products,
      });
    } catch (error) {
      console.log(error);
    }

    // Cart.getCart((cart) => {
    //   Product.fetchAll((products) => {
    //     const items: CartItemVM[] = [];
    //     for (const product of products) {
    //       const item = cart.items?.find((item) => item.id === product.id);
    //       if (item) {
    //         items.push({ product: product, quantity: item.quantity });
    //       }
    //     }
    //     res.render("shop/cart", {
    //       path: "/cart",
    //       pageTitle: "Your cart",
    //       items,
    //     });
    //   });
    // });
  },

  postCart: async (req: Request, res: Response) => {
    try {
      const productId: string = req.body.productId;
      const cart = await req.context.user.getCart();
      const products = await cart.getProducts({ where: { id: productId } });
      let product: Product | null = null;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity: number;
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
      } else {
        product = await Product.findByPk(productId);
        newQuantity = 1;
      }
      if (!product) {
        // TODO: Treat error.
        return;
      }
      await cart.addProduct(product, {
        through: { quantity: newQuantity } as CartItemOutput,
      });

      res.redirect("/cart");
    } catch (error) {
      console.log(error);
    }
  },

  postCartDeleteItem: async (req: Request, res: Response) => {
    try {
      const productId: string = req.body.productId;
      const cart = await req.context.user.getCart();
      const itemToDelete = (
        await cart.getProducts({ where: { id: productId } })
      )[0];
      await itemToDelete.cartItem.destroy();
      res.redirect("/cart");
    } catch (error) {
      console.log(error);
    }
  },

  postOrder: async (req: Request, res: Response) => {
    const user = req.context.user;
    const cart = await user.getCart();
    const products = await cart.getProducts();
    const order = await user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = {
          ...product.cartItem,
          quantity: product.cartItem.quantity,
        };
        return product;
      })
    );
    await cart.setProducts([]);
    res.redirect("/orders");
  },

  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await req.context.user.getOrders({
        include: [Product],
      });
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your orders",
        orders,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default ShopController;
