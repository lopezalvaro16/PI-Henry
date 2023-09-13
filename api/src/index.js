const app = require("./app");
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server raised in port: " + PORT);
});

//webserver
// const http = require("http");
// const getCharById = require("./controllers/getCharById");
// const PORT = 3001;

// http
//   .createServer((req, res) => {
//     const { url } = req;
//     res.setHeader("Access-Control.Allow-Origin", "*");

//     if (url.includes("rickandmorty/character/")) {
//       let urlId = url.split("/").pop();
//       getCharById(res, urlId);
//     }
//   })
//   .listen(PORT);
