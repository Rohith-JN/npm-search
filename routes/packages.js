var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function (req, res, next) {
  const package = req.query.package
  axios.get(`https://api.npms.io/v2/package/${package}`).then((response) => {
    res.send(response.data)
  })
});

module.exports = router;