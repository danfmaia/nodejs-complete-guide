import Sequelize, {
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
} from "sequelize";

import sequelizeConnection from "../database/sequelizeConnection";

import Cart from "./Cart";
import Order from "./Order";
import Product from "./Product";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

export interface UserInput extends Sequelize.Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User
  extends Sequelize.Model<UserAttributes, UserInput>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;

  public createProduct!: HasManyCreateAssociationMixin<Product>;
  public getProducts!: HasManyGetAssociationsMixin<Product>;

  public createCart!: HasOneCreateAssociationMixin<Cart>;
  public getCart!: HasOneGetAssociationMixin<Cart>;

  public createOrder!: HasManyCreateAssociationMixin<Order>;
  public getOrders!: HasManyGetAssociationsMixin<Order>;
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    tableName: "users",
    modelName: "user",
    sequelize: sequelizeConnection,
    paranoid: false,
  }
);

export default User;
