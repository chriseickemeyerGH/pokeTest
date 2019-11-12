const axios = require("axios");

const gameStart = (req, res) => {
  let sess = req.session;

  const idRange =
    Math.floor(Math.random() * (req.body.endingId - req.body.startingId + 1)) +
    req.body.startingId;
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${idRange}/`)
    .then(response => {
      sess.meterHeight = response.data.height / 10;
      sess.kgWeight = response.data.weight / 10;
      sess.lbWeight = ((response.data.weight / 10) * 2.20462262185).toFixed(1);
      sess.inHeight = (
        Math.floor((response.data.height / 10) * 39.37007874) % 12
      ).toFixed();
      sess.ftHeight = Math.floor(
        ((response.data.height / 10) * 3.28084).toFixed(2)
      );
      sess.name = response.data.name
        .toUpperCase()
        .replace(/-/g, " ")
        .replace("NORMAL", "")
        .replace("FARFETCHD", "FARFETCH'D");
      sess.type = response.data.types;
      sess.picture = response.data.sprites.front_default;
      sess.moves = response.data.moves;
      sess.stats = response.data.stats;

      res.status(200).json({
        serverMeterHeight: sess.meterHeight,
        serverKgWeight: sess.kgWeight,
        serverLbWeight: sess.lbWeight,
        serverInHeight: sess.inHeight,
        serverFtHeight: sess.ftHeight,
        serverType: sess.type,
        serverMoves: sess.moves,
        serverStats: sess.stats
      });
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = {
  gameStart
};
