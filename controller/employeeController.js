import {
  getAllEmployeesData,
  getEmployeeByIdService,
  registerEmployeeService,
  registerEmployeeForHackathonService,
} from "../service/employeeService.js";
import {
  getActiveHackathonsService,
  getPastHackathonsService,
  getUpcomingHackathonsService,
} from "../service/hackathonService.js";
export const registerEmployee = async (req, res) => {
  try {
    const token = await registerEmployeeService(req);
    res.json({
      message: "Employee Registered",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to register employee. " + error.message,
    });
  }
};
export const getAllActiveHashathon = async (req, res) => {
  try {
    const data = await getActiveHackathonsService(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllPastHashathon = async (req, res) => {
  try {
    const data = await getPastHackathonsService(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllUpcomingHashathon = async (req, res) => {
  try {
    const data = await getUpcomingHackathonsService(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const registerEmployeeForHackathon = async (req, res) => {
  try {
    await registerEmployeeForHackathonService(req);
    res
      .status(200)
      .json({ message: "Employee Registered for Hackathon succesfully" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  const data = await getAllEmployeesData();
  res.status(200).json({
    message: "Data Found",
    res: data,
  });
};

export const getEmployeeById = async (req, res) => {
  const data = await getEmployeeByIdService(req);
  res.json({
    message: data ? "Data Found" : "Player not found",
    data,
  });
};
