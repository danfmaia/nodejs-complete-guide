import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize(
  "node-complete",
  "root",
  "nodecomplete",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

export default sequelizeConnection;
