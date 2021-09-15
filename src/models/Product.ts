import Sequelize, { BelongsToMany } from "sequelize";

import sequelizeConnection from "../database/sequelizeConnection";
import CartItem from "./CartItem";
import { OrderItemOutput } from "./OrderItem";

interface ProductAttributes {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
}

export interface ProductInput
  extends Sequelize.Optional<ProductAttributes, "id"> {}
export interface ProductOutput extends Required<ProductAttributes> {}

class Product
  extends Sequelize.Model<ProductAttributes, ProductInput>
  implements ProductAttributes
{
  public id!: number;
  public title!: string;
  public imageUrl!: string;
  public price!: number;
  public description!: string;

  public readonly cartItem!: CartItem;

  public orderItem!: OrderItemOutput;
}

Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: Sequelize.STRING,
  },
  {
    tableName: "products",
    modelName: "product",
    sequelize: sequelizeConnection,
    paranoid: false,
  }
);

export default Product;
