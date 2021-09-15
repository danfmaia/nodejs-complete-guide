import Sequelize from "sequelize";

import sequelizeConnection from "../database/sequelizeConnection";

interface CartItemAttributes {
  id: number;
  quantity: number;
}

export interface CartItemInput
  extends Sequelize.Optional<CartItemAttributes, "id"> {}
export interface CartItemOutput extends Required<CartItemAttributes> {}

class CartItem
  extends Sequelize.Model<CartItemAttributes, CartItemInput>
  implements CartItemAttributes
{
  public id!: number;
  public quantity!: number;
}

CartItem.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cartItems",
    modelName: "cartItem",
    sequelize: sequelizeConnection,
    paranoid: false,
  }
);

export default CartItem;
