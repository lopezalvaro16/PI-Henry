const axios = require("axios");

async function getCharById(req, res) {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    if (response.data.name) {
      const { id, status, name, species, origin, image, gender } =
        response.data;
      res
        .status(200)
        .json({ id, status, name, species, origin, image, gender });
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getCharById;
