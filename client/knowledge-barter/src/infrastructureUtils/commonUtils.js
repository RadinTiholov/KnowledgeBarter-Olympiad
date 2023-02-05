export const speechHandler = (speech, text) => {
    speech.text = text;
    window.speechSynthesis.speak(speech)
}