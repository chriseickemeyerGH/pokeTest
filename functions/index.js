const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const axios = require("axios");

exports.pokemonQuery = functions.https.onCall(async (data, context) => {
  const UID = context.auth.uid;
  const range = data.range;

  const getID =
    Math.floor(Math.random() * (range.end - range.start + 1)) + range.start;

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${getID}/`);
    const response = res.data;
    const heightM = response.height / 10;
    const weightKg = response.weight / 10;
    const weightLb = ((response.weight / 10) * 2.2046).toFixed(1);
    const heightIn = (
      Math.floor((response.height / 10) * 39.37) % 12
    ).toFixed();
    const heightFt = Math.floor(((response.height / 10) * 3.2808).toFixed(2));
    const name = response.name
      .toUpperCase()
      .replace(/-/g, " ")
      .replace("NORMAL", "")
      .replace("FARFETCHD", "FARFETCH'D");
    const image = response.sprites.front_default;
    const { types, moves, stats } = response;
    const randomID = Math.random() * Math.random();

    const pokeData = {
      heightM: heightM,
      weightKg: weightKg,
      weightLb: weightLb,
      heightIn: heightIn,
      heightFt: heightFt,
      image: image,
      name: name,
      types: types,
      moves: moves,
      stats: stats,
    };

    await db.doc(`${UID}/${randomID}`).set({ pokeData: pokeData });
    return {
      backendResult: randomID,
    };
  } catch (err) {
    console.log(err);
  }
});
