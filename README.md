# linebot

## Example

```Typescript
import LineBot from 'linebot';
import * as MessageFacgory from 'linebot-message-factory';

const linebot = new LineBot({
    channelSecret: 'abcdefghigklmnopqrstuwxyz',
    channelAccessToken: 'abcdefghigklmnopqrstuwxyz'
});

linebot.on('message', (event: LineBot.Webhook.IMessageEvent) => {
    switch (event.message.type) {
        case 'text':
            let message = (<LineBot.Webhook.IText>event.message).text;
            const obj = MessageFacgory.createTextMessage(message);
            linebot.reply(event.replyToken, [obj]);
            break;
        default:
            break;
    }
});

linebot.listen('/', 80);
```