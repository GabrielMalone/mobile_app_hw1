import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import BackgroundSvg from './assets/player_craeation_page/player_creation_bg.svg'; 
import createDeck from "./createDeck";
import shuffleDeck from "./shuffle";
import HitIcon from "./assets/table_assets/hit_icon";
import StayIcon from "./assets/table_assets/stay_icon";



function BlackJackTable() {

  const playingCardWidth = 120;
  const playingCardHeight = 120 * (88/63);
  const startingPlayerMoney = 100;
  const houseMoneyStart = 10000000;
  const deltCardOffset = 20;
  const deckStart = createDeck();

  //-----------------------------------------------------------------------
  // UseState Related Content
  //-----------------------------------------------------------------------

  const [totalPot, setTotalPot] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(startingPlayerMoney);
  const [houseMoney, setHouseMoney] = useState(houseMoneyStart);
  const [deck, setDeck] = useState(deckStart);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  //-----------------------------------------------------------------------
  // Player Creation Related Content / Methods
  //-----------------------------------------------------------------------

  const deckOfCards =
    <View style={styles.deckOfCards}>
      {deck.map((card, i)=>{
        // since we have an SVG
        const CardImage = 
          card.turned ? 
          card.image : 
          card.backImage;
        return(
          <View 
            key={i}
            style={[styles.cardStack, 
              {
                bottom: (i) * 0.25,
                right: (i) * 0.25
              }
            ]}
          >
            <CardImage
              height={playingCardHeight}
              width={playingCardWidth}
            />
          </View>
        );
      })}
    </View>;

  //-----------------------------------------------------------------------
  const playerCards =
    <View style={styles.playerCardArea}>
      <View style={styles.playerDeckOfCards}>
        {playerHand.map((card, i)=>{
          // since we have an SVG
          const CardImage = 
            card.turned ? 
            card.image : 
            card.backImage;
          return(
            <View 
              key={i}
              style={[styles.cardStack, 
                {
                  bottom: 20,
                  left: (i) * deltCardOffset
                }
              ]}
            >
              <CardImage
                height={playingCardHeight}
                width={playingCardWidth}
              />
            </View>
          );
        })}
        </View>
    </View>;
  //-----------------------------------------------------------------------
  const dealerCards =
    <View style={styles.dealerCardArea}>
      <View style={styles.dealerDeckOfCards}>
        {dealerHand.map((card, i)=>{
          // since we have an SVG
          const CardImage = 
            card.turned ? 
            card.image : 
            card.backImage;
          return(
            <View 
              key={i}
              style={[styles.cardStack, 
                {
                  bottom: 20,
                  right: (i) * deltCardOffset
                }
              ]}
            >
              <CardImage
                height={playingCardHeight}
                width={playingCardWidth}
              />
            </View>
          );
        })}
        </View>
    </View>;
  //-----------------------------------------------------------------------
  
  const updateScore = (hand, player) => {

    let score = 0;

    switch(player){
      case "human":
      hand.forEach((card) => {
        let card_score = 0
        if (card.rank === 14) {
          card_score = 11;
          if (playerScore + card_score > 21){
            card_score = 1;
          }
        } else if (card.rank >= 10) {
          card_score = 10;
        } else {
          card_score = card.rank;
        }
        score += card_score;
      });
        setPlayerScore(score);
        break;
      case "dealer":
      hand.forEach((card) => {
        let card_score = 0
        if (card.rank === 14) {
          card_score = 11;
          if (dealerScore + card_score > 21){
            card_score = 1;
          }
        } else if (card.rank >= 10) {
          card_score = 10;
        } else {
          card_score = card.rank;
        }
        score += card_score;
      });
        setDealerScore(score);
        break; 
      default:
        break;       
    }
    console.log(player + " score: "  + score);
  }

  //-----------------------------------------------------------------------
  const dealCards = () => {

    // new array for re-render
    const shuffledDeck = [...deck];
    shuffleDeck(shuffledDeck);
    setDeck(shuffledDeck);

    // give two cards to human
    // give two cards to dealer

    let card_1 = shuffledDeck.pop();
    let card_2 = shuffledDeck.pop();
    let card_3 = shuffledDeck.pop();
    let card_4 = shuffledDeck.pop();

    card_4.turned = false;

    const newPlayerHand = [...playerHand, card_1, card_3];
    const newDealerHand = [...dealerHand, card_2, card_4];

    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setDeck([...shuffledDeck]);

    updateScore(newPlayerHand, "human");
    updateScore(newDealerHand, "dealer");

  }

  //-----------------------------------------------------------------------

  const drawCard = (player) => {
    // pull out the card
    // and update the deck
    let cardDrawn = deck.pop();
    setDeck([...deck]);
    // who is drawing the card
    switch(player){
      case "human":
        const newPlayerHand = [...playerHand, cardDrawn];
        setPlayerHand(newPlayerHand);
        updateScore(newPlayerHand, "human");
        break;
      case "dealer":
        const newDealerHand = [...dealerHand, cardDrawn];
        setDealerHand(newDealerHand);
        updateScore(newDealerHand, "dealer");
        break;
      default:
        break;
    }

  }

  const hitButtonJSX = 
    <Pressable
      title="hit!"
      onPress={() => drawCard("human")}
    >
      <HitIcon 
        color={"#01C987"}
        width={100}
        height={100}
      />
    </Pressable>
  ;

  const stayButtonJSX = 
    <Pressable
      title="stay!"
      onPress={()=>{console.log("stay!")}}
    >
      <StayIcon 
        color={"#019463"}
        width={100}
        height={100}
      />
    </Pressable>
  ;

  //-----------------------------------------------------------------------
  // BJ Table JSX
  //-----------------------------------------------------------------------

        // need to make deal button -- can just deal automatically actually
        // need to make hit and stay buttons
        // score area
        // then game loop with simple AI for dealer (hit if below 17)
        // just do simple fixed win lose amount
        // then can go into 
    useEffect(()=>{
      dealCards();
    },[]);

    return (
      <SafeAreaView 
        style={styles.blackJackTableParent}
        edges={["top"]}
      >
        <BackgroundSvg 
            width="100%" 
            height="100%" 
            preserveAspectRatio="xMidYMid slice"
            style={styles.svgBackground} 
        />
        {dealerCards}
        <View style={styles.centerTableWrapper}>
          {deckOfCards}
          {hitButtonJSX}
          {stayButtonJSX}
        </View>
        <HitIcon />
        {playerCards}
        <Text
          style={styles.playerScoreText}
        >
          {playerScore}
        </Text>
      </SafeAreaView>
    );
}

//-----------------------------------------------------------------------
// Style Sheet For Welcome Page
//-----------------------------------------------------------------------
const styles = StyleSheet.create({
  blackJackTableParent: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#071410",
  },
  svgBackground: {
    position: "absolute",
    bottom: -10,
    opacity: 0.4,
  },
  centerTableWrapper : {
    flex: 1,
    padding:  10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border: 2,
    color : "orange"
  },
  deckOfCards : {
    flex: 1,
    marginTop: 200,
    marginRight: 20, 
    // borderWidth: 2,
    // borderColor: "red",
    position: "relative",
  },
  dealerDeckOfCards : {
    flex: 1,
    marginTop: 200,
    marginRight: 20, 
    // borderWidth: 2,
    // borderColor: "red",
    position: "relative",
  },
  playerDeckOfCards : {
    flex: 1,
    marginLeft: 20, 
    // borderWidth: 2,
    // borderColor: "red",
    position: "relative",
  },
  deckOfCardsText : {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 64,
  },
  cardStack : {
    position: "absolute",
  },
  playerCardArea : {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#01C987",
  },
  dealerCardArea : {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#01C987",
    position: "relative",
  },
  playerScoreText :{
    color: "#01C987",
    textAlign: "center",
    fontSize: 100,
    fontFamily: "Futura",
  },

});

//-----------------------------------------------------------------------
// Export Welcome Scrreen
//-----------------------------------------------------------------------
export default BlackJackTable;