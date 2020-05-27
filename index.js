// import line from '@line/bot-sdk';
const line = require('@line/bot-sdk');
// import express from 'express';
const express = require('express');

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(lineConfig);
const app = express();

app.post('/', line.middleware(lineConfig), (req, res) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
        res.json(result);
    });
});

const handleEvent = (event) => {
    switch (event.type) {
      case 'join':
      case 'follow':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: '你好請問我們認識嗎?'
        });   
      case 'message':
        switch (event.message.type) {
          case 'text':
            return client.replyMessage(event.replyToken, {
              type: 'text',
              text: (event.message.text+'~*')
            });
        }
    }
  }


app.listen(process.env.PORT || 3000, () => {
    console.log('App now running on port 3000');
});
