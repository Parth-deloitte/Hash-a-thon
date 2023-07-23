import express from "express";
import {
  getAllActiveHashathon,
  getAllEmployees,
  getAllPastHashathon,
  getAllUpcomingHashathon,
  getEmployeeById,
  getHackathonStatus,
  listHackathon,
  registerEmployee,
  registerEmployeeForHackathon,
} from "../controller/employeeController.js";
import { signinEmployee } from "../controller/authConroller.js";
import { verifyAuthentication } from "../utilities/verifyAuthentication.js";
import {
  filterParticipant,
  hostHackathon,
  listHackathonParticipants,
  searchHackathon,
} from "../controller/hackathonController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/signup", registerEmployee);

router.post("/signin", signinEmployee);

router.get("/employee/:id", getEmployeeById);
router.get("/employee", getAllEmployees);

router.post("/host-hashathon", hostHackathon);
router.get("/active-hashathon", getAllActiveHashathon);
router.get("/past-hashathon", getAllPastHashathon);
router.get("/upcoming-hashathon", getAllUpcomingHashathon);
router.get("/search-hashathon/:name", searchHackathon);
router.post("/register-for-hashathon", registerEmployeeForHackathon);
router.get("/getParticipant/:id", listHackathonParticipants);
router.get("/filterParticipant/:parameter", filterParticipant);
router.get("/getHackathon/:id", listHackathon);
router.get("/getHackathonStatus/:id", getHackathonStatus);

//should not register for same hackathon
//router.get("/signup", async (req, res) => await registerEmployee(req, res));
//router.get("/matches", (req, res) => getAllMatches(req, res));

export default router;
