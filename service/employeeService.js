import {
  getAllEmployeesDao,
  getEmployeeByIdDao,
  registerEmployeeDao,
  registerEmployeeForHackathonDao,
} from "../dao/employeeDao.js";
import jwt from "jsonwebtoken";

export const registerEmployeeService = async (req) => {
  const employeeId = await registerEmployeeDao(req);
  const token = jwt.sign({ employeeId }, "your_secret_key", {
    expiresIn: "1h", // Set the token expiration time as needed
  });

  return token;
};

export const getAllEmployeesData = async () => {
  return await getAllEmployeesDao();
};

export const getEmployeeByIdService = async (req) => {
  const { id } = req.params;
  // console.log(typeof id);
  // const data = playerList.filter((player) => player.id === parseInt(id));
  return await getEmployeeByIdDao(id);
};

export const registerEmployeeForHackathonService = async (req) => {
  const { employee_id, hackathon_id } = req.body;

  return await registerEmployeeForHackathonDao(employee_id, hackathon_id);
};
