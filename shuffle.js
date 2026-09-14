  //fisher-Yates Shuffle
  const shuffleDeck = (deck) => {

    for (let i = deck.length - 1; i > 0; i--) {
        // take some percentage of the deck prior to current card
        // floor it to get that index
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // swap that random card w/ the current card
        const temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }

    return deck;
};

export default shuffleDeck