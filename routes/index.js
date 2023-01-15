const { Router } = require("express");

const indexRouter = Router();

indexRouter.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

indexRouter.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

module.exports = { indexRouter };