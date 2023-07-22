import { hostHackathonService } from "../service/hackathonService.js";

export const hostHackathon = async (req, res) => {
  try {
    await hostHackathonService(req);
    res.json({
      message: "Hosted Hackathon",
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to host hackathon. " + error.message,
    });
  }
};
