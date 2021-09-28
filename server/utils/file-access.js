const fs = require('fs');

const readFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath));
}

const writeFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

module.exports = {
    readFile,
    writeFile
}