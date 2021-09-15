import Sequelize, {
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";

import sequelizeConnection from "../database/sequelizeConnection";

import Product from "./Product";

interface CartAttributes {
  id: number;
}

export interface CartInput extends Sequelize.Optional<CartAttributes, "id"> {}
export interface CartOutput extends Required<CartAttributes> {}

class Cart
  extends Sequelize.Model<CartAttributes, CartInput>
  implements CartAttributes
{
  public id!: number;

  public getProducts!: HasManyGetAssociationsMixin<Product>;

  public addProduct!: BelongsToManyAddAssociationMixin<Product, Product["id"]>;
  public setProducts!: BelongsToManySetAssociationsMixin<
    Product,
    Product["id"]
  >;
  // public removeProducts!: BelongsToManyRemoveAssociationsMixin<
  //   Product,
  //   Product["id"]
  // >;
}

Cart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "carts",
    modelName: "cart",
    sequelize: sequelizeConnection,
    paranoid: false,
  }
);

export default Cart;
