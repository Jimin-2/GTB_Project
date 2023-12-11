/*const deepl = require('deepl-node');

const authKey =process.env.DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

(async () => {
    const result = await translator.translateText('안녕하세요', null, 'fr');
    console.log(result.text); // Bonjour, le monde !
})();*/

const express = require('express');
const deepl = require('deepl-node');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const authKey =process.env.DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

app.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;

    try {
        const result = await translator.translateText(text, null, targetLang);
        res.send(result.text); // Sending translation result to the client
    } catch (error) {
        console.error(error);
        res.status(500).send('Translation failed');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
