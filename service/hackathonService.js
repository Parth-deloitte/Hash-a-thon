import {
  filterParticipantDao,
  getActiveHackathonsDao,
  getPastHackathonsDao,
  getUpcomingHackathonsDao,
  hostHackathonDao,
  listHackathonParticipantsDao,
  searchHackathonsDao,
} from "../dao/hackathonDao.js";

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
