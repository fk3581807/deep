const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TelegramBotToken;

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.post('/webhook', (req, res) => {
  const bot = new TelegramBot(token, { polling: true });
  bot.on('message', (msg) => {
    console.log(msg);
    // Handle incoming message
  });
  res.status(200).send('OK');
});
