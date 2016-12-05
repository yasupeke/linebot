/// <reference path="./linebot.d.ts" />
import * as Net from 'net';
import * as Http from 'http';
import * as Https from 'https';
import * as Crypto from 'crypto';
import * as Request from 'request';

interface ISettings {
    channelSecret: string;
    channelAccessToken: string;
}

const API_URI = 'https://api.line.me/v2/bot';
const eventTypes: string[] = ['message', 'follow', 'unfollow', 'join', 'leave', 'postback', 'beacon'];

export default class LineBot {
    private _config: ISettings;
    private _handlers: { [type: string]: (event: LineBot.Webhook.IEvent) => void };

    constructor(config: ISettings) {
        this._config = config;
        this._handlers = {};
    }

    private validateSignature(signature: string, body: string): boolean {
        const channelSecret = this._config.channelSecret;
        return signature === Crypto.createHmac('sha256', channelSecret).update(new Buffer(body, 'utf8')).digest('base64');
    }

    public on(eventType: string, handler: (event: LineBot.Webhook.IEvent) => void): void {
        this._handlers[eventType] = handler;
    }

    public off(eventType: string, handler: (event: LineBot.Webhook.IEvent) => void): void {
        for (let type in this._handlers) {
            if (this._handlers[type] === handler) {
                delete this._handlers[type];
            }
        }
    }

    /**
     * Reply
     * 
     * @param {string} replyToken
     * @param {((LineBot.SendMessage.IText | LineBot.SendMessage.IImage | LineBot.SendMessage.IVideo | LineBot.SendMessage.IAudio | LineBot.SendMessage.ILocation | LineBot.SendMessage.ISticker | LineBot.SendMessage.IImagemap | LineBot.SendMessage.ITemplate)[])} messages
     * @returns {Promise<void>}
     * 
     * @memberOf LineBot
     */
    public reply(
        replyToken: string,
        messages: (LineBot.SendMessage.IText | LineBot.SendMessage.IImage | LineBot.SendMessage.IVideo | LineBot.SendMessage.IAudio | LineBot.SendMessage.ILocation | LineBot.SendMessage.ISticker | LineBot.SendMessage.IImagemap | LineBot.SendMessage.ITemplate)[]
    ): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (err: any) => void) => {
            Request.post(
                `${API_URI}/message/reply`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${this._config.channelAccessToken}`
                    },
                    json: true,
                    body: { replyToken, messages }
                },
                (error: any, response: Http.IncomingMessage, body: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                }
            );
        });
    }

    /**
     * Get Profile
     * 
     * @param {string} userId
     * @returns {Promise<LineBot.Profile>}
     * 
     * @memberOf LineBot
     */
    public getProfile(userId: string): Promise<LineBot.IProfile> {
        return new Promise<LineBot.IProfile>((resolve: (profile: LineBot.IProfile) => void, reject: (err: any) => void) => {
            Request.get(
                `${API_URI}/profile/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this._config.channelAccessToken}`
                    }
                },
                (error: any, response: Http.IncomingMessage, body: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(<LineBot.IProfile>JSON.parse(body));
                }
            )
        });
    }

    public listen(path: string, port: number, callback?: Function): Net.Server {
        const server = Http.createServer((req: Http.ServerRequest, res: Http.ServerResponse) => {
            if (req.method !== 'POST' || req.url !== path) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                return res.end('Not found');
            }
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const parseBody = JSON.parse(body);
                const isValid = this.validateSignature(req.headers['x-line-signature'], body);
                const webhookEvents = parseBody.events;
                if (!isValid) {
                    new Error('Invalid request.');
                    return;
                }
                if (!body || !webhookEvents) {
                    new Error('Not Event.');
                    return;
                }
                webhookEvents.forEach((event: LineBot.Webhook.IEvent) => {
                    for (const eventType in this._handlers) {
                        if (eventType === event.type) {
                            this._handlers[eventType](event);
                        }
                    }
                });
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end();
            });
        });
        return server.listen(port, callback);
    }
}