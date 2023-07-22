import { signinEmployeeDao } from "../dao/employeeDao.js";
import jwt from "jsonwebtoken";

export const signinEmployeeService = async (username, password) => {
  const employeeId = await signinEmployeeDao(username, password);
  const token = jwt.sign({ employeeId }, "your_secret_key", {
    expiresIn: "1h", // Set the token expiration time as needed
  });

  return token;
};
