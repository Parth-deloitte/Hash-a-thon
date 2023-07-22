import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database/db.js";
import { Employee } from "./model/employee.js";
import router from "./routes/hashathonRouter.js";
import { Hackathon } from "./model/hackathon.js";
import { HackathonParticipants } from "./model/hackathonParticipants.js";
const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// app.use(logger);
app.listen(PORT, (req, res) => {
  console.log(`Server started on port`);
});

app.use("/hashathon", router);
sequelize
  // .sync({ force: true })
  .sync()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
Employee.hasMany(HackathonParticipants);
Hackathon.hasMany(HackathonParticipants);
