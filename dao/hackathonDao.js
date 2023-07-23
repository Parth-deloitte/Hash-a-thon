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

export const getPastHackathonsDao = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fetch all past hackathons where the registration end date is before the current date
    const pastHackathons = await Hackathon.findAll({
      where: {
        registration_end_date: { [Sequelize.Op.lt]: new Date() },
      },
      limit,
      offset,
    });

    const totalPastHackathons = await Hackathon.count({
      where: {
        registration_end_date: { [Sequelize.Op.lt]: new Date() },
      },
    });

    return {
      total: totalPastHackathons,
      currentPage: page,
      perPage: limit,
      pastHackathons,
    };
  } catch (error) {
    throw new Error("Failed to get past Hackathon" + error.message);
  }
};

export const getUpcomingHackathonsDao = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fetch all upcoming hackathons where the registration start date is after the current date
    const upcomingHackathons = await Hackathon.findAll({
      where: {
        registration_start_date: { [Sequelize.Op.gt]: new Date() },
      },
      limit,
      offset,
    });

    const totalUpcomingHackathons = await Hackathon.count({
      where: {
        registration_start_date: { [Sequelize.Op.gt]: new Date() },
      },
    });

    return {
      total: totalUpcomingHackathons,
      currentPage: page,
      perPage: limit,
      upcomingHackathons,
    };
  } catch (error) {
    throw new Error("Failed to get upcoming Hackathon" + error.message);
  }
};

export const searchHackathonsDao = async (req) => {
  try {
    const { name } = req.params;
    const techs = name.split(" ");
    console.log(name);
    const techConditions = techs.map((tech) => ({
      technology_stack: {
        [Sequelize.Op.iLike]: `%${tech}%`,
      },
    }));
    console.log(techConditions);

    const searchQuery = {
      where: {
        [Sequelize.Op.or]: [
          { name: name },
          { company_name: name },
          ...techConditions,
        ],
      },
    };

    const hackathons = await Hackathon.findAll(searchQuery);
    //console.log(hackathons);
    return hackathons;
  } catch (error) {
    throw error;
  }
};
