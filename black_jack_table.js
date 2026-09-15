import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import BackgroundSvg from './assets/player_craeation_page/player_creation_bg.svg'; 
import createDeck from "./createDeck";
import shuffleDeck from "./shuffle";
import HitIcon from "./assets/table_assets/hit_icon";
import StayIcon from "./assets/table_assets/stay_icon";
import ResetIcon from "./assets/table_assets/reset_icon";


// luck modifier (sometimes the next card on the pile will be face up)
// beauty modifier (sometimes the dealer will get confused and hit >= 17) or show their first card
// intelligence modifier you can get accurate liklihood of the next card being less than bust

// to do -> show dealer score at gomeover
// get dealer loop to render correctly

function BlackJackTable() {

  const playingCardWidth = 120;
  const playingCardHeight = 120 * (88/63);
  const deltCardOffset = 20;
  const deckStart = createDeck();
  const defaultIconColor = "#02895c";
  const pressedIconColor = "#01C987";


  //-----------------------------------------------------------------------
  // UseState Related Content
  //-----------------------------------------------------------------------

  const [deck, setDeck] = useState(deckStart);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [hitIconColor, setHitIconColor] = useState(defaultIconColor);
  const [stayIconColor, setStayIconColor] = useState(defaultIconColor);
  const [resetIconColor, setResetIconColor] = useState(defaultIconColor);
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);

  //-----------------------------------------------------------------------
  // Player Creation Related Content / Methods
  //-----------------------------------------------------------------------

    const dealerShowCqrds = (hand) => {
    let revealedHand = hand.map((card)=>{
      return {...card, turned : true }
    });
    setDealerHand(revealedHand);
  }
  //-----------------------------------------------------------------------
  const calculateScore = (hand) => {

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
  };
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

    let score = calculateScore(hand);

    switch(player){
      case "human":
        setPlayerScore(score);
        console.log("Player Score: " + score);
        if (score > 21){
          console.log("player busted!");
          setGameOver(true);
          dealerShowCqrds(hand);
          setPlayerScore("BUSTED");
          
        } else if (score === 21) {
          console.log("Player Black Jack!");
          setPlayerScore("WIN");
          dealerShowCqrds(hand);
          setGameOver(true);
        } 

        break;
      case "dealer":
        setDealerScore(score);
        console.log("Dealer Score: " + score);
        if (score > 17){
          return;
        }
        if (score > 21){
          console.log("dealer busted!");
          dealerShowCqrds(hand);
          setGameOver(true);
   
        } else if (score === 21) {
          console.log("dealer Black Jack!");
          dealerShowCqrds(hand);
          setGameOver(true);
        } 

        break; 
      default:
        break;       
    }

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

    card_1.turned = true;
    card_2.turned = false;
    card_3.turned = true;
    card_4.turned = true;

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

    setHitIconColor(pressedIconColor);
    let cardDrawn = deck.pop();
    if (cardDrawn)
      cardDrawn.turned = true;
    setDeck([...deck]);

    switch(player){
      case "human":
        
        const newPlayerHand = [...playerHand, cardDrawn];
        setPlayerHand(newPlayerHand);
        updateScore(newPlayerHand, "human");

        break;
      case "dealer":

        if (dealerScore < 17){
          const newDealerHand = [...dealerHand, cardDrawn];
          setDealerHand(newDealerHand);
          updateScore(newDealerHand, "dealer");
        }

        break;
      default:
        break;
    }
  }

  //-----------------------------------------------------------------------
  const stayAction =  () => {
    setStayIconColor(pressedIconColor);
    // give dealer chance to decide to hit again if they want
    // probably use a while loop here
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];
    let currentDealerScore = dealerScore;
    
    while (currentDealerScore < 17) {
      
      let cardDrawn = currentDeck.pop();
      cardDrawn.turned = true;
      currentDealerHand = [...currentDealerHand, cardDrawn];
      currentDealerScore = calculateScore(currentDealerHand);
      console.log("dealer hitting: " + currentDealerScore);
    }

    if (dealerScore > 21){
      setPlayerScore("WIN"); 
    }

    if (playerScore > dealerScore){
      setPlayerScore("WIN");
    } 
    if (playerScore === dealerScore){
      setPlayerScore("TIE");
    } 
    if (playerScore < dealerScore){
      setPlayerScore("LOSE");
    } 

    setDeck([...currentDeck]);
    setDealerScore(currentDealerScore);

    // flip over all of dealer cards
    dealerShowCqrds(currentDealerHand);
    setGameOver(true);
  
  }
  //-----------------------------------------------------------------------
  


  //-----------------------------------------------------------------------
  const hitButtonJSX = 
    <Pressable
      title="hit!"
      onPressIn={() => {
        drawCard("human");
        drawCard("dealer");
      }}
      onPressOut={()=>{setHitIconColor(defaultIconColor)}}
    >
      <HitIcon 
        color={hitIconColor}
        width={100}
        height={100}
      />
    </Pressable>
  ;
  //-----------------------------------------------------------------------
  const stayButtonJSX = 
    <Pressable
      title="stay!"
      onPressIn={stayAction}
      onPressOut={()=>{setStayIconColor(defaultIconColor)}}
    >
      <StayIcon 
        color={stayIconColor}
        width={100}
        height={100}
      />
    </Pressable>
  ;
  //-----------------------------------------------------------------------

  const resetDeck = () => {
    setResetIconColor(pressedIconColor);
    // reset deck
    const deckStart = createDeck();
    shuffleDeck(deckStart);
    // deal cards
    setDeck(deckStart);
  }
  //-----------------------------------------------------------------------
  const resetHands = () => {
    setPlayerHand([]);
    setDealerHand([]);
  }
 //-----------------------------------------------------------------------

  const resetButtonJSX = 
    <Pressable
      title="resetGame!"
      onPressIn={()=>{
          setGameOver(false);
          setReset(!reset);       // just need this to trigger a re-render
          resetDeck();
          resetHands();
        }
      }
      onPressOut={()=>{
        setResetIconColor(defaultIconColor);
      }}
    >
      <ResetIcon 
        color={stayIconColor}
        width={200}
        height={200}
      />
    </Pressable>
  ;
  //-----------------------------------------------------------------------
  // BJ Table JSX
  //-----------------------------------------------------------------------

    useEffect(()=>{
      dealCards();
    },[reset]);                                       // re-render on reset

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
          {gameOver ? resetButtonJSX : hitButtonJSX}
          {gameOver ? null : stayButtonJSX}
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