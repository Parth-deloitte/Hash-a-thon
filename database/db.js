import Sequelize from "sequelize";

// Option 3: Passing parameters separately (other dialects)

const databaseName = "demohashathon";
const username = "postgresmaster";
const password = "FoflVjJRhv8OG19RZ7y8uOJEjKCW36JR";
const host = "dpg-ciuv48tgkuvoiga2umeg-a";
const port = 5432;

export const sequelize = new Sequelize(databaseName, username, password, {
  host,
  port,
  dialect: "postgres",
});
