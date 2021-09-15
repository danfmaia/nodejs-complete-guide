import Sequelize from "sequelize";

import sequelizeConnection from "../database/sequelizeConnection";

interface OrderItemAttributes {
  id: number;
  quantity: number;
}

export interface OrderItemInput
  extends Sequelize.Optional<OrderItemAttributes, "id"> {}
export interface OrderItemOutput extends Required<OrderItemAttributes> {}

class OrderItem
  extends Sequelize.Model<OrderItemAttributes, OrderItemInput>
  implements OrderItemAttributes
{
  public id!: number;
  public quantity!: number;
}

OrderItem.init(
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
    tableName: "orderItems",
    modelName: "orderItem",
    sequelize: sequelizeConnection,
    paranoid: false,
  }
);

export default OrderItem;
