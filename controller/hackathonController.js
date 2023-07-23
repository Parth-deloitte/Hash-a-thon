import {
  hostHackathonService,
  searchHackathonsService,
} from "../service/hackathonService.js";

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

export const searchHackathon = async (req, res) => {
  try {
    const hackathon = await searchHackathonsService(req);
    res.json({
      message: " Hackathon founded",
      hackathon,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to search hackathon. " + error.message,
    });
  }
};
