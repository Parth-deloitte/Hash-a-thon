import { Hackathon } from "../model/hackathon.js";
import Sequelize from "sequelize";
import { HackathonParticipants } from "../model/hackathonParticipants.js";
import { Employee } from "../model/employee.js";
import { Organizer } from "../model/organizer.js";

export const registerOrganizerDao = async (req) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error(
      "Missing required fields. Please provide username and password."
    );
  }
  try {
    const organizer = await Organizer.create({
      username,
      password,
    });

    return organizer.organizer_id; // Return the employeeId after successful creation
  } catch (error) {
    //console.error(error); // Log the error for debugging purposes
    throw error;
  }
};

export const signinOrganizerDao = async (username, password) => {
  try {
    const organizer = await Organizer.findOne({ where: { username } });
    if (!organizer || organizer.password !== password) {
      throw new Error("Invalid username or password");
    }

    return organizer.organizer_id;
  } catch (error) {
    throw error;
  }
};

export const hostHackathonDao = async (req, res) => {
  const {
    name,
    company_name,
    technology_stack,
    registration_start_date,
    registration_end_date,
    minimum_experience_level,
    slots_available,
    hackathon_start_date,
    hackathon_end_date,
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
      hackathon_start_date,
      hackathon_end_date,
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
          {
            name: {
              [Sequelize.Op.iLike]: `%${name}%`,
            },
          },
          {
            company_name: {
              [Sequelize.Op.iLike]: `%${name}%`,
            },
          },
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
export const filterParticipantDao = async (parameter) => {
  try {
    const techs = parameter.split(" ");
    console.log(parameter);
    const techConditions = techs.map((tech) => ({
      technology_stack: {
        [Sequelize.Op.iLike]: `%${tech}%`,
      },
    }));
    console.log(techConditions);

    const searchQuery = {
      where: {
        [Sequelize.Op.or]: [
          { experience_level: { [Sequelize.Op.iLike]: `%${parameter}%` } },
          { business_unit: { [Sequelize.Op.iLike]: `%${parameter}%` } },
          ...techConditions,
        ],
      },
    };

    const employees = await Employee.findAll(searchQuery);
    //console.log(hackathons);
    return employees;
  } catch (error) {
    throw error;
  }
};

export const listHackathonParticipantsDao = async (hackathonId) => {
  try {
    const participants = await HackathonParticipants.findAll({
      where: { hackathon_id: hackathonId },
      include: [{ model: Employee, attributes: ["username", "email"] }],
    });
    console.log(participants);
    return participants;
  } catch (error) {
    throw error;
  }
};

export const modifyHackathonInformationDao = async (id, attributes) => {
  try {
    if (!attributes || Object.keys(attributes).length === 0) {
      throw new Error("Please provide at least one attribute to update.");
    }
    const existingHackathon = await Hackathon.findByPk(id);
    //console.log(existingHackathon);
    const {
      name,
      company_name,
      technology_stack,
      registration_start_date,
      registration_end_date,
      minimum_experience_level,
      slots_available,
    } = attributes;

    if (!existingHackathon) {
      throw new Error("Hackathon not found.");
    }

    const currentDate = new Date();
    if (currentDate >= existingHackathon.registration_start_date) {
      throw new Error("Cannot modify after registration starts.");
    }

    if (name) {
      existingHackathon.name = name;
    }
    if (company_name) {
      existingHackathon.company_name = company_name;
    }
    if (technology_stack) {
      existingHackathon.technology_stack = technology_stack;
    }
    if (registration_start_date) {
      existingHackathon.registration_start_date = registration_start_date;
    }

    if (registration_end_date) {
      existingHackathon.registration_end_date = registration_end_date;
    }
    if (minimum_experience_level) {
      existingHackathon.minimum_experience_level = minimum_experience_level;
    }
    if (slots_available) {
      existingHackathon.slots_available = slots_available;
    }

    await existingHackathon.save();

    return "Hackathon information updated successfully.";
  } catch (error) {
    throw error;
  }
};

export const cancelHackathonDao = async (hackathonId) => {
  try {
    const hackathon = await Hackathon.findByPk(hackathonId);

    if (!hackathon) {
      return false;
    }

    await hackathon.destroy();

    return true;
  } catch (error) {
    throw error;
  }
};

export const allHackathonDao = async () => {
  try {
    const allHackathons = await Hackathon.findAll();
    return allHackathons;
  } catch (error) {
    throw error;
  }
};
