export const speechHandler = (speech, text, synth) => {
    speech.text = text;
    synth.speak(speech);
}