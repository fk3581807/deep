const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Load environment variables
const { TELEGRAM_BOT_TOKEN, VERCEL_URL } = process.env;

// Create a Telegram bot instance
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Set up webhook
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.status(200).send();
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Enter a Google Drive file link:');
});

// Handle incoming messages
bot.on('message', (msg) => {
  if (msg.text) {
    const link = msg.text;
    const fileId = extractFileId(link);

    if (fileId) {
      const downloadLink = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyB2Gi6A21kfBvBDs3MRfF5yKrp-nxmRbLQ`;
      bot.sendMessage(msg.chat.id, downloadLink, {
        caption: 'Direct Download Link',
      });
    } else {
      bot.sendMessage(msg.chat.id, 'Invalid Google Drive file link format.');
    }
  }
});

// Extract file ID from Google Drive link
function extractFileId(link) {
  const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = link.match(regex);
  return match && match[1];
}

// Start the bot
app.listen(3000, () => {
  console.log('Bot started on port 3000');
});
