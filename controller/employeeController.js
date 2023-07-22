import {
  getAllEmployeesData,
  getEmployeeByIdService,
  registerEmployeeService,
} from "../service/employeeService.js";

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