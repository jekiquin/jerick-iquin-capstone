const fs = require('fs');

const getLogos = (_req, res) => {
  try {
    const filenames = fs.readdirSync('./public/api/assets/images');
    const logos = filenames.filter((file) => file.includes('logo'));
    const logoKeys = logos.map((logo) =>
      logo.replace(/logo.(png|jpg|jpeg)/g, '')
    );
    const toSend = {};
    logoKeys.forEach((logoKey, idx) => {
      toSend[logoKey] = logos[idx];
    });

    res.status(200).json(toSend);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal error!' });
  }
};

module.exports = getLogos;
