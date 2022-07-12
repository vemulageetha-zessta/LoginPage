// Import statements
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Custom imports
const { authenticate, userDetails } = require("./Authentication");
const { authenticateJWT } = require("./TokenGeneration");

const port = 3002;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const tokenResult = await authenticate(username, password);
    if (tokenResult !== "Enter a valid user details") {
      res.json({
        token: tokenResult,
      });
    } else {
      res.json({
        token: null,
      });
    }
  } catch (err) {
    res.json({
      message:
        "There is an error in executing the DB queries and generating a token",
    });
  }
});

app.get("/", authenticateJWT, async (req, res) => {
  const userName = req.user.username;
  const data = await userDetails(userName);

  res.json(data);
});

app.listen(port, () => {
  console.log(`server is running in the port ${port}`);
});
