import { Hackathon } from "../model/hackathon.js";
import Sequelize from "sequelize";
export const hostHackathonDao = async (req, res) => {
  const {
    name,
    company_name,
    technology_stack,
    registration_start_date,
    registration_end_date,
    minimum_experience_level,
    slots_available,
    status,
  } = req.body;

  try {
    // Check if the user is authorized to host a hackathon (e.g., company admin)
    // (You can implement your own logic to validate the user's role or permissions)

    // Create a new hackathon entry in the database

    const newHackathon = await Hackathon.create({
      name,
      company_name,
      technology_stack,
      registration_start_date,
      registration_end_date,
      minimum_experience_level,
      slots_available,
      status,
    });

    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const getActiveHackathonsDao = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    console.log("kl");
    // Fetch all active hackathons where the registration is currently open
    const activeHackathons = await Hackathon.findAll({
      where: {
        registration_start_date: { [Sequelize.Op.lte]: new Date() },
        registration_end_date: { [Sequelize.Op.gte]: new Date() },
      },
      limit,
      offset,
    });

    const totalActiveHackathons = await Hackathon.count({
      where: {
        registration_start_date: { [Sequelize.Op.lte]: new Date() },
        registration_end_date: { [Sequelize.Op.gte]: new Date() },
      },
    });

    return {
      total: totalActiveHackathons,
      currentPage: page,
      perPage: limit,
      activeHackathons,
    };
  } catch (error) {
    throw new Error("Failed to active Hackathon" + error.message);
  }
};
