import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const History = sequelize.define(
  "History",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: true,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {}
);

(async function () {
  await History.sync({ force: true });
})();

export default History;
