const axios = require("axios");

function getCharById(res, id) {
  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(({ data }) => {
      const { name, image, gender, species, status, origin } = data;
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify({ name, image, gender, species, status, origin }));
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "text/plain" }).end(error.message);
    });
}

module.export = getCharById;
