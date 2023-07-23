import {
  allHackathonService,
  cancelHackathonService,
  filterParticipantService,
  hostHackathonService,
  listHackathonParticipantsService,
  modifyHackathonInformationService,
  registerOrganizerService,
  searchHackathonsService,
} from "../service/hackathonService.js";

export const registerOrganizer = async (req, res) => {
  try {
    const token = await registerOrganizerService(req);
    res.json({
      message: "Organizer Registered",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to register organizer. " + error.message,
    });
  }
};
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

export const modifyHackathonInformation = async (req, res) => {
  try {
    const msg = await modifyHackathonInformationService(req);
    res.json({
      message: msg,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const cancelHackathon = async (req, res) => {
  try {
    const isDeleted = await cancelHackathonService(req);
    if (isDeleted) {
      res.json({ message: "Hackathon canceled successfully." });
    } else {
      res.status(404).json({ error: "Hackathon not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel Hackathon." });
  }
};

export const getAllHackathons = async (req, res) => {
  try {
    const allHackathons = await allHackathonService();
    res.json({ allHackathons });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all Hackathons." });
  }
};
