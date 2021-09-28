const router = require('express').Router();
const getLogos =  require('../controller/get-logos');

router.get('/get-logos', getLogos)

module.exports = router;