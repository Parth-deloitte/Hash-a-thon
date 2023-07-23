import {
  filterParticipantService,
  hostHackathonService,
  listHackathonParticipantsService,
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

export const filterParticipant = async (req, res) => {
  try {
    const employee = await filterParticipantService(req);
    res.json({
      message: " Employee founded",
      employee,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to search employee. " + error.message,
    });
  }
};

export const listHackathonParticipants = async (req, res) => {
  try {
    const participants = await listHackathonParticipantsService(req);
    res.json({
      message: " Participants founded",
      participants,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to search hackathon. " + error.message,
    });
  }
};
