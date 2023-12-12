/*const deepl = require('deepl-node');

const authKey =process.env.DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

(async () => {
    const result = await translator.translateText('안녕하세요', null, 'fr');
    console.log(result.text); // Bonjour, le monde !
})();*/

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const deepl = require('deepl-node');
const dotenv = require('dotenv');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require("dotenv").config();

const authKey = process.env.DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', async (msg, targetLang) => {
        try {
            const translation = await translator.translateText(msg, null, targetLang);
            io.emit('chat message', translation.text);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

