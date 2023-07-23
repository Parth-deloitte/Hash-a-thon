import {
  getActiveHackathonsDao,
  getPastHackathonsDao,
  getUpcomingHackathonsDao,
  hostHackathonDao,
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
