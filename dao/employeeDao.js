import { Employee } from "../model/employee.js";

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
    console.log(employee); // Log the employee object to check if it's created successfully
    return employee.employee_id; // Return the employeeId after successful creation
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    throw new Error("Failed to create employee in the database");
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

export const getEmployeeByIdDao = async (req) => {
  const { employeeId } = req.params;
  try {
    const employee = await Employee.findByPk(employeeId);
    return employee;
  } catch (error) {
    throw new Error("Failed to get employee by ID");
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
