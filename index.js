import { Client, middleware } from '@line/bot-sdk';
import express from 'express';

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '/Cc+gz2XwOLhUVIjYdVT0Df8d7l1Y5enFdv6BnMX7WyWSNwEaEKuRc5EnwQrTlS9mVFYp4vGoPdEtek62iRsb3k1lMw1UHaPQAEV9lqqeA+janICpbwg88WXE7Vpx+bmn0O2LtMEvTWY98ml3DPqtAdB04t89/1O/w1cDnyilFU=',
    channelSecret: process.env.CHANNEL_SECRET || 'e8bc3cfb8f1c14340910a6603228ae21'
};

const client = new Client(lineConfig);
const app = express();

app.post('/', middleware(lineConfig), async (req, res) => {
    // Promise
    // .all(req.body.events.map(handleEvent))
    // .then((result) => {
    //     res.json(result);
    // })
    // .catch((err) => console.log(err));
    try {
        let result = await req.body.events.map(handleEvent);
        res.json(result);
    } 
    catch (err) {
        console.log(err);
    }

});

const handleEvent = ({type, message, replyToken}) => {
    switch (type) {
    case 'join': //加入群組
    case 'follow': //追蹤
        return client.replyMessage(replyToken, {
        type: 'text',
        text: `感謝您將本帳號加入好友(happy)\n若不想接收提醒，可以點選本畫面右上方的選單圖示，然後關閉「提醒」的設定喔(ok)?`
        });   
    case 'message': //傳訊息給機器人
        switch (message.type) {
        case 'text':
            textHandler(replyToken, message.text);
            break;
        case 'sticker':
            // do sth with sticker
            return 
        }
    }
}

const textHandler = (replyToken, inputText) => {
    let resText;
    switch (inputText) {
        case '你好':
            resText = '你好啊';
            break;
        case 'test':
            resText = '測試';
            break
    }
    return client.replyMessage(replyToken, {
        type: 'text',
        text: resText
    });

}


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App now running on port ${port}`);
});
