const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
