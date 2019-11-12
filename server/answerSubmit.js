const answerSubmit = (req, res) => {
  let sess = req.session;
  if (req.body.guess === req.session.name) {
    res.status(200).json({
      serverName: sess.name,
      serverImage: sess.picture,
      serverState: "Correct"
    });
  } else {
    res.status(200).json({
      serverState: "Incorrect"
    });
  }
};
module.exports = {
  answerSubmit
};
