import { Client, middleware } from '@line/bot-sdk';
import express from 'express';

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '/Cc+gz2XwOLhUVIjYdVT0Df8d7l1Y5enFdv6BnMX7WyWSNwEaEKuRc5EnwQrTlS9mVFYp4vGoPdEtek62iRsb3k1lMw1UHaPQAEV9lqqeA+janICpbwg88WXE7Vpx+bmn0O2LtMEvTWY98ml3DPqtAdB04t89/1O/w1cDnyilFU=',
    channelSecret: process.env.CHANNEL_SECRET || 'e8bc3cfb8f1c14340910a6603228ae21'
};

const client = new Client(lineConfig);
const app = express();

app.post('/', middleware(lineConfig), (req, res) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
        res.json(result);
    })
    .catch((err) => console.log(err));
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


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App now running on port ${port}`);
});
