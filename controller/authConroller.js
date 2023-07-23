import {
  signinEmployeeService,
  signinOrganizerService,
} from "../service/authService.js";

export const signinEmployee = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await signinEmployeeService(username, password);
    res.json({
      message: "Employee Signed In",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to signed employee. " + error.message,
    });
  }
};

export const signinOrganizer = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await signinOrganizerService(username, password);
    res.json({
      message: "Organizer Signed In",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to signed employee. " + error.message,
    });
  }
};
