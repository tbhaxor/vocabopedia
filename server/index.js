const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bluebird = require("bluebird");
const path = require("path");
const fs = require("fs");

mongoose.Promise = bluebird;

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Unable to connect to DB");
  });

const app = express();

app.use(express.static(path.resolve(path.join(__dirname, "..", "dist"))));

app.use(express.json());
if (process.env.NODE_DEV == "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("common", {
      stream: fs.createWriteStream(process.env.ACCESS_LOG, { flags: "a" })
    })
  );
}
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "DELETE", "PUT", "POST"],
    credentials: true
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore({ path: ".sessions" })
  })
);

app.use("/api/user", require("./routes/user"));
app.use("/api/word", require("./routes/word"));

app.all("*", (_, res) => {
  res.sendFile(
    express.static(
      path.resolve(path.join(__dirname, "..", "dist", "index.html"))
    )
  );
});

const port = parseInt(process.env.PORT);

app.listen(port, () => {
  console.log("HTTP serving on %d", port);
});
