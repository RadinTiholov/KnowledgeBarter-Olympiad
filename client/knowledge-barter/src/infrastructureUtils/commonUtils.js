import { convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export const speechHandler = (speech, text, synth) => {
    speech.text = text;
    synth.speak(speech);
}

export const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

export const getRawEditorState = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);

    return JSON.stringify(rawState);
}

export const getHtmlEditorRaw = (json) => {
    return stateToHTML(
        convertFromRaw(json)
    );
}