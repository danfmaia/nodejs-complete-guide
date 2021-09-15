import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Product from "../models/Product";
import User from "../models/User";

import sequelizeConnection from "./sequelizeConnection";

const dbInit = async (callback: () => void) => {
  try {
    Product.belongsTo(User, {
      // foreignKey: "userId",
      constraints: true,
      onDelete: "CASCADE",
    });
    User.hasMany(Product);

    Cart.belongsTo(User);
    User.hasOne(Cart);

    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });

    Order.belongsTo(User);
    User.hasMany(Order);

    Order.belongsToMany(Product, { through: OrderItem });
    Product.belongsToMany(Order, { through: OrderItem });

    await sequelizeConnection.sync({
      // force: true,
      alter: false,
    });

    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "Dan",
        email: "test@test.com",
      });
    }

    const cart = await user.getCart();
    if (!cart) {
      await user.createCart();
    }

    callback();
  } catch (error) {
    console.log(error);
  }
};

export default dbInit;
