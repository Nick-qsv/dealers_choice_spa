const express = require("express");
const chalk = require("chalk");
const app = express();
const path = require("path");
const {
    syncAndSeed,
    models: { Author, Book },
  } = require("./db");


  app.use(express.json());
  
  app.use("/dist", express.static(path.join(__dirname, "dist")));
  
  app.get("/", (req, res, next) =>
    res.sendFile(path.join(__dirname, "index.html"))
  );

  app.use("/router", require("./router"));

  const init = async () => {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (ex) {
      console.log(ex);
    }
  };
  
  init();