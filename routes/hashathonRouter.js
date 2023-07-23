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
import {
  signinEmployee,
  signinOrganizer,
} from "../controller/authConroller.js";
import { verifyAuthentication } from "../utilities/verifyAuthentication.js";
import {
  cancelHackathon,
  filterParticipant,
  getAllHackathons,
  hostHackathon,
  listHackathonParticipants,
  modifyHackathonInformation,
  registerOrganizer,
  searchHackathon,
} from "../controller/hackathonController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/signup", registerEmployee);
router.post("/organizer/signup", registerOrganizer);

router.post("/signin", signinEmployee);
router.post("/organizer/signin", signinOrganizer);

router.get(
  "/employee/:id",
  verifyAuthentication("your_secret_key"),
  getEmployeeById
);
router.get(
  "/employee",
  verifyAuthentication("your_secret_key"),
  getAllEmployees
);

router.post(
  "/host-hashathon",
  verifyAuthentication("your_s_key"),
  hostHackathon
);
router.get("/active-hashathon", getAllActiveHashathon);
router.get("/past-hashathon", getAllPastHashathon);
router.get("/upcoming-hashathon", getAllUpcomingHashathon);
router.get("/search-hashathon/:name", searchHackathon);
router.post(
  "/register-for-hashathon",
  verifyAuthentication("your_secret_key"),
  registerEmployeeForHackathon
);
router.get("/getParticipant/:id", listHackathonParticipants);
router.get("/filterParticipant/:parameter", filterParticipant);
router.get("/getHackathon/:id", listHackathon);
router.get("/getHackathonStatus/:id", getHackathonStatus);
router.put(
  "/modifyHackathon/:id",
  verifyAuthentication("your_s_key"),
  modifyHackathonInformation
);
router.delete(
  "/deleteHackathon/:id",
  verifyAuthentication("your_s_key"),
  cancelHackathon
);
router.get("/getAllHackathon", getAllHackathons);

//should not register for same hackathon
//router.get("/signup", async (req, res) => await registerEmployee(req, res));
//router.get("/matches", (req, res) => getAllMatches(req, res));

export default router;
