const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const axios = require("axios");

exports.pokemonQuery = functions.https.onCall(async (data, context) => {
  const UID = context.auth.uid;
  const range = data.range;
  console.log(UID);
  console.log(range.end);
  console.log(range.start);
  const getID =
    Math.floor(Math.random() * (range.end - range.start + 1)) + range.start;

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${getID}/`);
    const response = res.data;
    const heightM = response.height / 10,
      weightKg = response.weight / 10,
      weightLb = ((response.weight / 10) * 2.20462262185).toFixed(1),
      heightIn = (
        Math.floor((response.height / 10) * 39.37007874) % 12
      ).toFixed(),
      heightFt = Math.floor(((response.height / 10) * 3.28084).toFixed(2)),
      name = response.name
        .toUpperCase()
        .replace(/-/g, " ")
        .replace("NORMAL", "")
        .replace("FARFETCHD", "FARFETCH'D"),
      image = response.sprites.front_default;
    const { types, moves, stats } = response;
    const randomID = Math.random() * Math.random();
    console.log(randomID);

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
      stats: stats
    };

    await db.doc(`${UID}/${randomID}`).set({ pokeData: pokeData });
    return {
      backendResult: randomID
    };
  } catch (err) {
    console.log(err);
  }
});
