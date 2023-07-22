import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
export const Employee = sequelize.define("Employee", {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience_level: {
    type: DataTypes.STRING,
  },
  technology_stack: {
    type: DataTypes.STRING,
  },
  business_unit: {
    type: DataTypes.STRING,
  },
});
