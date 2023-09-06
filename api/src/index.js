const http = require("http");
const characters = require("./utils/data");

const PORT = 3001;

http
  .createServer((req, res) => {
    const { url } = req;
    res.setHeader("Access-Control.Allow-Origin", "*");

    if (url.includes("rickandmorty/character/")) {
      let urlId = url.split("/").pop();
      let found = characters.find(
        (character) => character.id === Number(urlId)
      );

      res
        .writeHead(200, {
          "Content-Type": "Application/json",
        })
        .end(JSON.stringify(found));
    }
  })
  .listen(PORT);
