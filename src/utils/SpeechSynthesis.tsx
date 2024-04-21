export const SpeechSynthesis = ( word: string) => {
    const msg = new SpeechSynthesisUtterance(word);
    msg.rate = 0.5;
    window.speechSynthesis.speak(msg);
}