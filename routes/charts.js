var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function (req, res, next) {
  const chart = req.query.chart
  const package = req.query.package
  axios.get(`https://api.npmjs.org/downloads/range/last-${chart}/${package}`).then((response) => {
    res.send(response.data)
  })
});

module.exports = router;