import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  registerEmployee,
} from "../controller/employeeController.js";
import { signinEmployee } from "../controller/authConroller.js";
import { verifyAuthentication } from "../utilities/verifyAuthentication.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/signup", registerEmployee);

router.post("/signin", signinEmployee);

router.get("/employee/:id", verifyAuthentication, getEmployeeById);
router.get("/employee", verifyAuthentication, getAllEmployees);

//router.get("/signup", async (req, res) => await registerEmployee(req, res));
//router.get("/matches", (req, res) => getAllMatches(req, res));

export default router;
