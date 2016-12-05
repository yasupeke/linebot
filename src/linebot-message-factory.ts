export function createTextMessage(text: string): LineBot.SendMessage.IText {
    return {
        type: 'text',
        text
    };
}

export function createImageMessage(originalContentUrl: string, previewImageUrl: string): LineBot.SendMessage.IImage {
    return {
        type: 'image',
        originalContentUrl,
        previewImageUrl,
    };
}

export function createVideoMessage(originalContentUrl: string, previewImageUrl: string): LineBot.SendMessage.IVideo {
    return {
        type: 'video',
        originalContentUrl,
        previewImageUrl
    };
}

export function createAudioMessage(originalContentUrl: string, duration: number): LineBot.SendMessage.IAudio {
    return {
        type: 'audio',
        originalContentUrl,
        duration
    };
}

export function createLocationMessage(title: string, adress: string, latitude: number, longitude: number): LineBot.SendMessage.ILocation {
    return {
        type: 'location',
        title,
        adress,
        latitude,
        longitude
    }
}

export function createStickerMessage(packageId: string, stickerId: string): LineBot.SendMessage.ISticker {
    return {
        type: 'sticker',
        packageId,
        stickerId
    }
}

export function createImagemapMessage(baseUrl: string, altText: string, baseSize: LineBot.SendMessage.IBaseSize, actions: (LineBot.SendMessage.ImagemapAction.IUri | LineBot.SendMessage.ImagemapAction.IMessage)[]): LineBot.SendMessage.IImagemap {
    return {
        type: 'imagemap',
        baseUrl,
        altText,
        baseSize,
        actions
    };
}

export function createTemplateMessage(altText: string, tempalte: LineBot.Template.IButton | LineBot.Template.IConfirm | LineBot.Template.ICarousel): LineBot.SendMessage.ITemplate {
    return {
        type: 'template',
        altText,
        tempalte
    };
}

export namespace Template {
    export function createButton(thumbnailImageUrl: string, title: string, text: string, actions: LineBot.TemplateAction.IPostback | LineBot.TemplateAction.IMessage | LineBot.TemplateAction.IUri): LineBot.Template.IButton {
        return {
            type: 'buttons',
            thumbnailImageUrl,
            title,
            text,
            actions
        };
    }

    export function createConfirm(text: string, actions: LineBot.TemplateAction.IPostback | LineBot.TemplateAction.IMessage | LineBot.TemplateAction.IUri): LineBot.Template.IConfirm {
        return {
            type: 'confirm',
            text,
            actions,
        };
    }

    export function createCarousel(columns: LineBot.Template.IColumn[]): LineBot.Template.ICarousel {
        return {
            type: 'carousel',
            columns
        };
    }

    export function createColumn(thumbnailImageUrl: string, title: string, text: string, actions: LineBot.TemplateAction.IPostback | LineBot.TemplateAction.IMessage | LineBot.TemplateAction.IUri): LineBot.Template.IColumn {
        return {
            thumbnailImageUrl,
            title,
            text,
            actions
        };
    }
}

export namespace TempateAction {
    export function createPostback(label: string, data: string, text?: string): LineBot.TemplateAction.IPostback {
        return {
            type: 'postback',
            label,
            data,
            text,
        };
    }

    export function createMessage(label: string, text: string): LineBot.TemplateAction.IMessage {
        return {
            type: 'message',
            label,
            text
        };
    }

    export function createUri(label: string, uri: string): LineBot.TemplateAction.IUri {
        return {
            type: 'uri',
            label,
            uri,
        };
    }
}
