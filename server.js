import express from "express";
import cors from "cors";
import db from "./db/index.js";
import routes from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(cors()); // Correct usage of CORS middleware
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
