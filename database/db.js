import Sequelize from "sequelize";

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(
  "demo-hashathon",
  "postgres",
  "postgresmaster",
  {
    host: "localhost",
    port: 5433,
    dialect:
      "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);
