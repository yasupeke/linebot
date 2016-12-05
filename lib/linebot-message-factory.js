"use strict";
function createTextMessage(text) {
    return {
        type: 'text',
        text
    };
}
exports.createTextMessage = createTextMessage;
function createImageMessage(originalContentUrl, previewImageUrl) {
    return {
        type: 'image',
        originalContentUrl,
        previewImageUrl,
    };
}
exports.createImageMessage = createImageMessage;
function createVideoMessage(originalContentUrl, previewImageUrl) {
    return {
        type: 'video',
        originalContentUrl,
        previewImageUrl
    };
}
exports.createVideoMessage = createVideoMessage;
function createAudioMessage(originalContentUrl, duration) {
    return {
        type: 'audio',
        originalContentUrl,
        duration
    };
}
exports.createAudioMessage = createAudioMessage;
function createLocationMessage(title, adress, latitude, longitude) {
    return {
        type: 'location',
        title,
        adress,
        latitude,
        longitude
    };
}
exports.createLocationMessage = createLocationMessage;
function createStickerMessage(packageId, stickerId) {
    return {
        type: 'sticker',
        packageId,
        stickerId
    };
}
exports.createStickerMessage = createStickerMessage;
function createImagemapMessage(baseUrl, altText, baseSize, actions) {
    return {
        type: 'imagemap',
        baseUrl,
        altText,
        baseSize,
        actions
    };
}
exports.createImagemapMessage = createImagemapMessage;
function createTemplateMessage(altText, tempalte) {
    return {
        type: 'template',
        altText,
        tempalte
    };
}
exports.createTemplateMessage = createTemplateMessage;
var Template;
(function (Template) {
    function createButton(thumbnailImageUrl, title, text, actions) {
        return {
            type: 'buttons',
            thumbnailImageUrl,
            title,
            text,
            actions
        };
    }
    Template.createButton = createButton;
    function createConfirm(text, actions) {
        return {
            type: 'confirm',
            text,
            actions,
        };
    }
    Template.createConfirm = createConfirm;
    function createCarousel(columns) {
        return {
            type: 'carousel',
            columns
        };
    }
    Template.createCarousel = createCarousel;
    function createColumn(thumbnailImageUrl, title, text, actions) {
        return {
            thumbnailImageUrl,
            title,
            text,
            actions
        };
    }
    Template.createColumn = createColumn;
})(Template = exports.Template || (exports.Template = {}));
var TempateAction;
(function (TempateAction) {
    function createPostback(label, data, text) {
        return {
            type: 'postback',
            label,
            data,
            text,
        };
    }
    TempateAction.createPostback = createPostback;
    function createMessage(label, text) {
        return {
            type: 'message',
            label,
            text
        };
    }
    TempateAction.createMessage = createMessage;
    function createUri(label, uri) {
        return {
            type: 'uri',
            label,
            uri,
        };
    }
    TempateAction.createUri = createUri;
})(TempateAction = exports.TempateAction || (exports.TempateAction = {}));
