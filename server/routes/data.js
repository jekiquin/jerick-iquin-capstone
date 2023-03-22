const router = require('express').Router();
const getLogos = require('../controller/get-logos');
const { getData, postData, getGameData } = require('../controller/get-data');
const { postHandle } = require('../controller/error-handling');

require('dotenv').config();

router.get('/api/get-logos', getLogos);

router.use('/api/get-highscores', postHandle);
router.get('/api/get-highscores', getData);
router.post('/api/get-highscores', postData);

router.get('/get-highscores/:gameId', getGameData);

module.exports = router;
