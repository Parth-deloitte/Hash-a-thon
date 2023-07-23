import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Organizer = sequelize.define("Organizer", {
  organizer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
