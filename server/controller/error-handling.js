const VALIDKEYS = ['game', 'name', 'score'];

const postHandle = (req, res, next) => {
    if(req.method !== 'POST') {
        next();
    }

    if(req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({message: 'Content-type header should be set to application/json'})
    }

    const keys = Object.keys(req.body);
    if (keys.length !== VALIDKEYS.length) {
        return res.status(400).json({message: `Body should only contain the following keys: ${VALIDKEYS}`});
    }
    for(let key of keys) {
        if (!VALIDKEYS.includes(key)){
            res.status(400).json({message: `${key} is an invalid key.`});
        }
    }

    next();
}

module.exports = {
    postHandle
}