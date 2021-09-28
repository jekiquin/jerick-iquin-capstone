const { readFile, writeFile } = require('../utils/file-access');

const DATA_PATH = 'data/data.json'

const getData = (_req, res) => {
    try {
        const data = readFile(DATA_PATH);
        if(!data) {
            return res.status(204).json({});
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal error!'});
    }
}

const postData = (req, res) => {
    try {
        const data = readFile(DATA_PATH);
        const {game, name, score} = req.body
        if(!data[game]) {
            data[game] = [];
        }
        const findScore = data[game].find(userScore => userScore.name === name && userScore.score === score);
        if (findScore) {
            return res.status(200).json({game: {name, score}})
        }
        data[game].push({name, score});
        data[game].sort((a,b) => b.score - a.score);
        writeFile(DATA_PATH, data);
        res.status(201).json({
            game,
            score: {name, score}});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal error!'});
    }
}


module.exports = {
    getData,
    postData
}