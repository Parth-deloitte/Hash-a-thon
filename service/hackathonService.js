import {
  getActiveHackathonsDao,
  hostHackathonDao,
} from "../dao/hackathonDao.js";

export const hostHackathonService = async (req) => {
  return await hostHackathonDao(req);
};

export const getActiveHackathonsService = async (req) => {
  return await getActiveHackathonsDao(req);
};
