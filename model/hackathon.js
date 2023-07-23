import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { HackathonParticipants } from "./hackathonParticipants.js";

export const Hackathon = sequelize.define(
  "Hackathon",
  {
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
  },
  {
    // Define virtual attributes
    getterMethods: {
      async status() {
        const currentDate = new Date();
        if (currentDate < this.registration_start_date) {
          return "upcoming";
        } else if (
          currentDate >= this.registration_start_date &&
          currentDate <= this.registration_end_date
        ) {
          const participantCount = await HackathonParticipants.count({
            where: { hackathon_id: this.hackathon_id },
          });

          if (participantCount < this.slots_available) {
            return "open";
          } else {
            return "closed";
          }
        } else {
          return "closed";
        }
      },
    },
  }
);
