const loginLib = require("@cs7player/login-lib");
const express = require("express");
const cors = require("cors");
const app = express();
require("./app/utils/constants");
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allow_origns.includes(origin) || IS_ALLOW_ORIGN==1 ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(loginLib.jwt.verifyToken);
loginLib.mongoConnection();
const routes = require("./app/routes");
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server run on the http://localhost:${PORT}`);
});
