declare namespace LineBot {
    namespace Webhook {
        interface IEvent {
            type: 'message' | 'follow' | 'unfollow' | 'join' | 'leave' | 'postback' | 'beacon';
            timestamp: number;
            source: IUser | IGroup | IRoom;
        }

        interface IUser {
            type: 'user';
            userId: string;
        }

        interface IGroup {
            type: 'group';
            groupId: string;
        }

        interface IRoom {
            type: 'room';
            roomId: string;
        }

        interface IMessageEvent extends IEvent {
            type: 'message';
            replyToken: string;
            message: IText | IImage | IVideo | IAudio | ILocation | ISticker;
        }

        interface IText {
            id: string;
            type: 'text';
            text: string;
        }

        interface IImage {
            id: string;
            type: 'image';
        }

        interface IVideo {
            id: string;
            type: 'video';
        }

        interface IAudio {
            id: string;
            type: 'audio';
        }

        interface ILocation {
            id: string;
            type: 'location ';
            title: string;
            adress: string;
            latitude: number;
            longitude: number;
        }

        interface ISticker {
            id: string;
            type: 'sticker';
            packageId: string;
            stickerId: string;
        }

        interface IFollowEvent extends IEvent {
            type: 'follow';
            replyToken: string;
        }

        interface IUnfollowEvent extends IEvent {
            type: 'unfollow';
        }

        interface IJoinEvent extends IEvent {
            type: 'join';
            replyToken: string;
        }

        interface IPostbackEvent extends IEvent {
            type: 'postback';
            replyToken: string;
            postback: IPostback
        }

        interface IPostback {
            data: string;
        }

        interface IBeaconEvent extends IEvent {
            type: 'beacon';
            replyToken: string;
            postback: IPostback
            beacon: IBeacon;
        }

        interface IBeacon {
            hwid: string;
            type: string;
        }
    }

    interface IReplyMessage {
        replyToken: string;
        messages: (SendMessage.IText | SendMessage.IImage | SendMessage.IVideo | SendMessage.IAudio | SendMessage.ILocation | SendMessage.ISticker | SendMessage.IImagemap | SendMessage.ITemplate)[]
    }

    namespace SendMessage {
        interface IText {
            type: 'text';
            text: string;
        }

        interface IImage {
            type: 'image';
            originalContentUrl: string;
            previewImageUrl: string;
        }

        interface IVideo {
            type: 'video';
            originalContentUrl: string;
            previewImageUrl: string;
        }

        interface IAudio {
            type: 'audio';
            originalContentUrl: string;
            duration: number;
        }

        interface ILocation {
            type: 'location';
            title: string;
            adress: string;
            latitude: number;
            longitude: number;
        }

        interface ISticker {
            type: 'sticker';
            packageId: string;
            stickerId: string;
        }

        interface IImagemap {
            type: 'imagemap';
            baseUrl: string;
            altText: string;
            baseSize: IBaseSize;
            actions: (ImagemapAction.IUri | ImagemapAction.IMessage)[];
        }

        interface IBaseSize {
            width: number;
            height: number;
        }

        namespace ImagemapAction {
            interface IUri {
                type: 'uri';
                linkUri: string;
                area: IImagemapArea;
            }

            interface IMessage {
                type: 'message';
                text: string;
                area: IImagemapArea;
            }
        }

        interface IImagemapArea {
            x: number;
            y: number;
            width: number;
            height: number;
        }

        interface ITemplate {
            type: 'template';
            altText: string;
            tempalte: Template.IButton | Template.IConfirm | Template.ICarousel;
        }
    }

    namespace Template {
        interface IButton {
            type: 'buttons';
            thumbnailImageUrl: string;
            title: string;
            text: string;
            actions: TemplateAction.IPostback | TemplateAction.IMessage | TemplateAction.IUri;
        }

        interface IConfirm {
            type: 'confirm';
            text: string;
            actions: TemplateAction.IPostback | TemplateAction.IMessage | TemplateAction.IUri;
        }

        interface ICarousel {
            type: 'carousel';
            columns: IColumn[];
        }

        interface IColumn {
            thumbnailImageUrl: string;
            title: string;
            text: string;
            actions: TemplateAction.IPostback | TemplateAction.IMessage | TemplateAction.IUri;
        }
    }

    namespace TemplateAction {
        interface IPostback {
            type: 'postback';
            label: string;
            data: string;
            text?: string;
        }

        interface IMessage {
            type: 'message';
            label: string;
            text: string;
        }

        interface IUri {
            type: 'uri';
            label: string;
            uri: string;
        }
    }

    interface IProfile {
        displayName: string;
        userId: string;
        pictureUrl: string;
        statusMessage: string;
    }
}