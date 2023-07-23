import {
  allHackathonDao,
  cancelHackathonDao,
  filterParticipantDao,
  getActiveHackathonsDao,
  getPastHackathonsDao,
  getUpcomingHackathonsDao,
  hostHackathonDao,
  listHackathonParticipantsDao,
  modifyHackathonInformationDao,
  registerOrganizerDao,
  searchHackathonsDao,
} from "../dao/hackathonDao.js";
import jwt from "jsonwebtoken";
export const registerOrganizerService = async (req) => {
  const employeeId = await registerOrganizerDao(req);
  const token = jwt.sign({ employeeId }, "your_s_key", {
    expiresIn: "1h", // Set the token expiration time as needed
  });

  return token;
};
export const hostHackathonService = async (req) => {
  return await hostHackathonDao(req);
};

export const getActiveHackathonsService = async (req) => {
  return await getActiveHackathonsDao(req);
};

export const getPastHackathonsService = async (req) => {
  return await getPastHackathonsDao(req);
};

export const getUpcomingHackathonsService = async (req) => {
  return await getUpcomingHackathonsDao(req);
};

export const searchHackathonsService = async (req) => {
  return await searchHackathonsDao(req);
};

export const listHackathonParticipantsService = async (req) => {
  const { id } = req.params;
  return await listHackathonParticipantsDao(id);
};

export const filterParticipantService = async (req) => {
  const { parameter } = req.params;
  return await filterParticipantDao(parameter);
};

export const modifyHackathonInformationService = async (req) => {
  const { id } = req.params;
  const attributes = req.body;

  return await modifyHackathonInformationDao(id, attributes);
};

export const cancelHackathonService = async (req) => {
  const { id } = req.params;

  return await cancelHackathonDao(id);
};

export const allHackathonService = async () => {
  return await allHackathonDao();
};

allHackathonService;
