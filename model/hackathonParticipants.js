import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const HackathonParticipants = sequelize.define("HackathonParticipants", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_registered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

// Add any additional associations or methods for the HackathonParticipants model here

// Export the HackathonParticipants model
