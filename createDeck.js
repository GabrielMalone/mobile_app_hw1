import { cards } from './cards'
import CardBacK from './assets/card_assets/poker-qr/cardBack.svg'


const getCardImage = (suit, rank) => {
    
    let s = "";

    switch(rank){
        
        case 10:
            s = "T"
            break;
        case 11:
            s = "J"
            break;
        case 12:
            s = "Q"
            break;
        case 13:
            s = "K"
            break;
        case 14:
            s = "A"
            break;
        default:
            s = rank.toString();
            break;
    }

    switch(suit){

        case "hearts":
            s += "H"
            break;
        case "spades":
            s += "S"
            break;
        case "diamonds":
            s += "D"
            break;
        case "clubs":
            s += "C"
            break;
        default:
            break;

    }

    return cards[s];

}


const createDeck = () => {

    const suit = ["hearts", "spades", "diamonds", "clubs"];
    const deck = [];

    for (let i = 0 ; i < suit.length ; i ++)
    {
        for (let j = 2 ; j <= 14 ; j ++)
        {
            let card = {
                suit: suit[i], 
                rank: j, 
                image: getCardImage(suit[i], j),
                turned: false,
                backImage: CardBacK
            }
            deck.push(card);
        }
    }
    return deck;

};

export default createDeck;
