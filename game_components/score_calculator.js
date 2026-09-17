  //-----------------------------------------------------------------------
  export const calculateScore = (hand) => {

    let score = 0;
    let aceCount = 0;

    hand.forEach((card) => {

      if (card.rank === 14) {
        score += 11;
        aceCount++;
      } 
      else if (card.rank >= 10) {
        score += 10;
      } 
      else {
        score += card.rank;
      }

    });

    // change an Ace from 11 to 1 if busting
    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }
    return score;
}