const { Router } = require("express");

const indexRouter = Router();

indexRouter.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

module.exports = { indexRouter };