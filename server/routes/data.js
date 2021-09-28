const router = require('express').Router();
const getLogos =  require('../controller/get-logos');
const {getData, postData, getGameData} = require('../controller/get-data');
const {postHandle} = require('../controller/error-handling');

require('dotenv').config();

router.get('/get-logos', getLogos);

router.get('/get-highscores/:gameId', getGameData);
router.use('/get-highscores', postHandle);
router.get('/get-highscores', getData);
router.post('/get-highscores', postData)

module.exports = router;