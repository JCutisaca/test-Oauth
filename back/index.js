require("dotenv").config();
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

app.post("/auth/google", async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code);
  console.log(tokens);

  res.json(tokens);
});

app.post("/auth/google/refresh-token", async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken();
  res.json(credentials);
});

app.listen(PORT, () => console.log(`server is running in port ${PORT}`));
