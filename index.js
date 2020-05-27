// import line from '@line/bot-sdk';
const line = require('@line/bot-sdk');
// import express from 'express';
const express = require('express');

const lineConfig = {
    channelAccessToken: '/Cc+gz2XwOLhUVIjYdVT0Df8d7l1Y5enFdv6BnMX7WyWSNwEaEKuRc5EnwQrTlS9mVFYp4vGoPdEtek62iRsb3k1lMw1UHaPQAEV9lqqeA+janICpbwg88WXE7Vpx+bmn0O2LtMEvTWY98ml3DPqtAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'e8bc3cfb8f1c14340910a6603228ae21'
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


app.listen(3000, () => {
    console.log('App now running on port 3000');
});
