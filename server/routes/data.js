const router = require('express').Router();
const fs = require('fs');

router.get('/get-logos', (_req, res) => {
    try{
        const filenames = fs.readdirSync('./public/assets/images');
        const logos = filenames.filter(file => file.includes('logo'));
        const logoKeys = logos.map(logo => logo.replace(/logo.(png|jpg|jpeg)/g, ''))
        const toSend = {};
        logoKeys.forEach((logoKey, idx) => {
            toSend[logoKey] = logos[idx];
        })
        
        res.status(200).json(toSend);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: 'Internal error!'});
    }

})

module.exports = router;