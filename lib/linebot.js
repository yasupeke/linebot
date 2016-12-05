"use strict";
const Http = require('http');
const Crypto = require('crypto');
const Request = require('request');
const API_URI = 'https://api.line.me/v2/bot';
const eventTypes = ['message', 'follow', 'unfollow', 'join', 'leave', 'postback', 'beacon'];
class LineBot {
    constructor(config) {
        this._config = config;
        this._handlers = {};
    }
    validateSignature(signature, body) {
        const channelSecret = this._config.channelSecret;
        return signature === Crypto.createHmac('sha256', channelSecret).update(new Buffer(body, 'utf8')).digest('base64');
    }
    on(eventType, handler) {
        this._handlers[eventType] = handler;
    }
    off(eventType, handler) {
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
    reply(replyToken, messages) {
        return new Promise((resolve, reject) => {
            Request.post(`${API_URI}/message/reply`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${this._config.channelAccessToken}`
                },
                json: true,
                body: { replyToken, messages }
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
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
    getProfile(userId) {
        return new Promise((resolve, reject) => {
            Request.get(`${API_URI}/profile/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${this._config.channelAccessToken}`
                }
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(JSON.parse(body));
            });
        });
    }
    listen(path, port, callback) {
        const server = Http.createServer((req, res) => {
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
                webhookEvents.forEach((event) => {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LineBot;
