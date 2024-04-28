export const speechSynthesis = ( word: string, callbackOnEnd: void) => {
    const utterMsg = new SpeechSynthesisUtterance(word);
    utterMsg.rate = 0.8;
    window.speechSynthesis.speak(utterMsg);

    // trigger at the end of the speaking
    utterMsg.onend = () => {
        callbackOnEnd
    };
}