var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function (req, res, next) {
  const package = req.query.package
  const data = axios.get(`https://api.npms.io/v2/package/${package}`).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    res.send({
      "error": "true",
      "errorCode": error.response.status,
      "errorMessage": error.response.data.message
    })
  })
});

module.exports = router;