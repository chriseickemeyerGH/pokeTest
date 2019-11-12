const timeOut = (req, res) => {
  res.status(200).json({
    serverName: req.session.name,
    serverImage: req.session.picture
  });
};
module.exports = {
  timeOut
};
