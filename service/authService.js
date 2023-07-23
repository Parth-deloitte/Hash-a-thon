import { signinEmployeeDao } from "../dao/employeeDao.js";
import jwt from "jsonwebtoken";
import { signinOrganizerDao } from "../dao/hackathonDao.js";

export const signinEmployeeService = async (username, password) => {
  const employeeId = await signinEmployeeDao(username, password);
  const token = jwt.sign({ employeeId }, "your_secret_key", {
    expiresIn: "1h", // Set the token expiration time as needed
  });

  return token;
};

export const signinOrganizerService = async (username, password) => {
  const employeeId = await signinOrganizerDao(username, password);
  const token = jwt.sign({ employeeId }, "your_s_key", {
    expiresIn: "1h", // Set the token expiration time as needed
  });

  return token;
};
