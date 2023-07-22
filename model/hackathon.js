import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Hackathon = sequelize.define("Hackathon", {
  hackathon_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  technology_stack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registration_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registration_end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  minimum_experience_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slots_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "closed"),
    defaultValue: "open",
  },
});

// Export the Hackathon model
