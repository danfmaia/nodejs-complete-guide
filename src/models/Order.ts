import Sequelize, {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
} from "sequelize";

import sequelizeConnection from "../database/sequelizeConnection";

import Product from "./Product";

interface OrderAttributes {
  id: number;
}

export interface OrderInput extends Sequelize.Optional<OrderAttributes, "id"> {}
export interface OrderOutput extends Required<OrderAttributes> {}

class Order
  extends Sequelize.Model<OrderAttributes, OrderInput>
  implements OrderAttributes
{
  public id!: number;

  public addProducts!: BelongsToManyAddAssociationsMixin<
    Product,
    Product["id"]
  >;
}

Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "orders",
    modelName: "order",
    sequelize: sequelizeConnection,
    paranoid: false,
  }
);

export default Order;
