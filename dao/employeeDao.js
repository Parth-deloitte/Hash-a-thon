import { Employee } from "../model/employee.js";
import { Hackathon } from "../model/hackathon.js";
import { HackathonParticipants } from "../model/hackathonParticipants.js";
import { Sequelize } from "sequelize";
export const registerEmployeeDao = async (req) => {
  const {
    username,
    email,
    password,
    experience_level,
    technology_stack,
    business_unit,
  } = req.body;
  if (!username || !email || !password) {
    throw new Error(
      "Missing required fields. Please provide username, email, and password."
    );
  }
  try {
    const employee = await Employee.create({
      username,
      email,
      password,
      experience_level,
      technology_stack,
      business_unit,
    });
    console.log(employee);
    return employee.employee_id; // Return the employeeId after successful creation
  } catch (error) {
    //console.error(error); // Log the error for debugging purposes
    throw error;
  }
};

export const signinEmployeeDao = async (username, password) => {
  try {
    const employee = await Employee.findOne({ where: { username } });
    if (!employee || employee.password !== password) {
      throw new Error("Invalid username or password");
    }

    return employee.employee_id;
  } catch (error) {
    throw error;
  }
};

export const isEmployeeRegisteredInOngoingHackathonDao = async (
  employee_id
) => {
  try {
    const currentDate = new Date();
    //console.log("process");
    const ongoingHackathon = await HackathonParticipants.findOne({
      where: {
        employee_id: employee_id,
        "$Hackathon.registration_start_date$": {
          [Sequelize.Op.lte]: currentDate,
        },
        "$Hackathon.registration_end_date$": {
          [Sequelize.Op.gte]: currentDate,
        },
      },
      include: [{ model: Hackathon, as: "Hackathon" }],
    });
    //console.log("result");
    return ongoingHackathon ? true : false;
  } catch (error) {
    throw error;
  }
};
export const registerEmployeeForHackathonDao = async (
  employee_id,
  hackathon_id
) => {
  try {
    // Check if the hackathon exists
    const hackathon = await Hackathon.findByPk(hackathon_id);
    const employee = await Employee.findByPk(employee_id);

    //console.log(employee);
    if (!hackathon || !employee) {
      throw new Error("Hackathon or Employee not found.");
    }

    // Check if the hackathon's registration date has passed
    const currentDate = new Date();
    if (currentDate > hackathon.registration_end_date) {
      throw new Error("Registration date has passed.");
    }

    // Check if the hackathon slots are full
    const participantCount = await HackathonParticipants.count({
      where: { hackathon_id: hackathon_id },
    });
    //console.log(participantCount + "op");
    if (participantCount >= hackathon.slots_available) {
      throw new Error("Hackathon slots are full.");
    }
    const employee_tech = employee.technology_stack.split(" ");
    const hackathon_tech = hackathon.technology_stack.split(" ");
    console.log(employee_tech);
    console.log(hackathon_tech);
    var isAtLeastOneTechMatch = false;

    for (const tech of hackathon_tech) {
      if (employee_tech.includes(tech)) {
        isAtLeastOneTechMatch = true;
        break;
      }
    }

    if (
      employee.experience_level < hackathon.minimum_experience_level ||
      isAtLeastOneTechMatch === false
    ) {
      throw new Error("Not having required experience" + isAtLeastOneTechMatch);
    }
    const existingRegistration = await HackathonParticipants.findOne({
      where: {
        employee_id,
        hackathon_id,
      },
    });

    if (existingRegistration) {
      throw new Error("Employee is already registered for this hackathon.");
    }

    const isRegisteredInOngoingHackathon =
      await isEmployeeRegisteredInOngoingHackathonDao(employee_id);
    //console.log(existingRegistration + "new");
    if (isRegisteredInOngoingHackathon) {
      throw new Error(
        "Employee is already registered for another ongoing hackathon."
      );
    }

    await HackathonParticipants.create({
      employee_id,
      hackathon_id,
      registration_date: new Date(),
      is_registered: true,
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const listHackathonDao = async (employeeId) => {
  try {
    const hackathons = await HackathonParticipants.findAll({
      where: { employee_id: employeeId },
      include: [{ model: Hackathon, attributes: ["name", "company_name"] }],
    });
    console.log(hackathons);
    return hackathons;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeByIdDao = async (employeeId) => {
  try {
    const employee = await Employee.findByPk(employeeId);
    return employee;
  } catch (error) {
    throw new Error("Failed to get employee by ID");
  }
};

export const getHackathonStatusDao = async (hackathonId) => {
  try {
    const hackathon = await Hackathon.findByPk(hackathonId);

    if (!hackathon) {
      throw new Error("hackathon not found.");
    }

    const status = hackathon.get("status");
    console.log(status);
    return status;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployeesDao = async () => {
  try {
    const employees = await Employee.findAll();
    return employees;
  } catch (error) {
    throw new Error("Failed to get all employees");
  }
};
