 // shuffle array randomly
export const shuffle = (vocaList: (any)[]) => {
    let currentIndex = vocaList.length;
    let tempVocaList = [ ...vocaList ];

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [tempVocaList[currentIndex], tempVocaList[randomIndex]] = [tempVocaList[randomIndex], tempVocaList[currentIndex]];
    }
    return tempVocaList;
}