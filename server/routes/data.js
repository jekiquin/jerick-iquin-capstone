const router = require('express').Router();
const getLogos =  require('../controller/get-logos');
const {getData, postData} = require('../controller/get-data');
const {postHandle} = require('../controller/error-handling');

require('dotenv').config();

router.get('/get-logos', getLogos);

router.use('/get-highscores', postHandle);
router.get('/get-highscores', getData);
router.post('/get-highscores', postData)

module.exports = router;