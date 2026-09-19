import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";
import { calculateScore } from "./game_components/score_calculator";
import { cannedResponses } from "./game_components/canned_responses";
import BackgroundSvg from './assets/player_craeation_page/player_creation_bg.svg'; 
import createDeck from "./createDeck";
import shuffleDeck from "./shuffle";
import HitIcon from "./assets/table_assets/hit_icon";
import StayIcon from "./assets/table_assets/stay_icon";
import ResetIcon from "./assets/table_assets/reset_icon";
//-----------------------------------------------------------------------

// to do -> show dealer score at gomeover
// luck modifier (sometimes the next card on the pile will be face up)
// beauty modifier (sometimes the dealer will get confused and hit >= 17) or show their first card
// intelligence modifier you can get accurate liklihood of the next card being less than bust

function BlackJackTable({

  playerName,
  smartPoints,
  navigation,
  beautyPoints,
  luckPoints,

  }) {

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
  const [luckEffect, setLuckEffect] = useState("");
  const [gotLucky, setGotLucky] = useState(false);
  const [beautyEffect, setBeautyEffect] = useState("");
  const [smartsEffect, setSmartsEffect] = useState("");
  const [drawn, setDrawn] = useState(false);
  const [gotPretty, setGotPretty] = useState(false);
  const [gotSmart, setGotSmart] = useState(false);
  const firstDeal = useRef(true);
  
  //-----------------------------------------------------------------------
  // Player Creation Related Content / Methods
  //-----------------------------------------------------------------------
  const dealerShowCqrds = (hand=dealerHand) => {
    let revealedHand = hand.map((card)=>{
      return {...card, turned : true }
    });
    setDealerHand(revealedHand);
  }
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
                left: (i) * 0.25
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
  const statsArea = 
    <View style={styles.statsAreaAndInfo}>
      <Text style={gotPretty ? 
        styles.statsAreaTextHighlighted : 
        styles.statsAreaText}>
          Beauty({beautyPoints}): {beautyEffect}
        </Text>
      <Text 
        style={gotSmart ? 
        styles.statsAreaTextHighlighted : 
        styles.statsAreaText}
      >
        Smarts({smartPoints}): {smartsEffect}</Text>
      <Text 
        style={gotLucky ? 
          styles.statsAreaTextHighlighted : 
          styles.statsAreaText}
        >
          Luck__({luckPoints}): {luckEffect}
      </Text>
    </View>;
  //-----------------------------------------------------------------------
  const dealerScoreDisplay =
    <View style=
        {styles.dealerScoreDisplayStyle}>
      <Text style=
        {styles.dealerScoreDisplayStyle}>
          {dealerScore}
      </Text>
    </View>;
  //-----------------------------------------------------------------------
  const playerCards =
    <View style={styles.playerCardArea}>
      {statsArea}
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
      {gameOver ? dealerScoreDisplay : null}
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
          dealerShowCqrds();
          setPlayerScore("BUSTED");
          
        } else if (score === 21) {
          console.log("Player Black Jack!");
          setPlayerScore("WIN");
          dealerShowCqrds();
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
          dealerShowCqrds();
          setGameOver(true);
   
        } else if (score === 21) {
          console.log("dealer Black Jack!");
          dealerShowCqrds();
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
    // shuffle like whoa
    for (let i = 0 ; i < 100 ; i ++){
          shuffleDeck(shuffledDeck);
    }

    setPlayerHand([]);
    setDealerHand([]);
    setDeck([...shuffledDeck]);

    updateScore([], "human");
    updateScore([], "dealer");

  }
  //-----------------------------------------------------------------------
  // okay need to program a luck effect 
  // if lucky then...we pick a card that gets you as close to 21 as possible
  const rollLuck = (tmpDeck) => {

    const hand = [...playerHand];
    const curPlayerScore = calculateScore(hand);
    const difference = 21 - curPlayerScore;
    let luckyDeck = [...tmpDeck];
    // if lucky can we pull a card that gets closer to blackjack

    let luckyCardFound = false;
    let luckCardIndex = 0;

    // need to do logic for aces
    for (let i = 0 ; i < luckyDeck.length ; i ++){

      let card = luckyDeck[i];
      let value = 0;
      if (card.rank > 10){
        value = 10;
      } else{
        value = card.rank;
      }
      if (value === difference) {
        luckyCardFound = true;
        luckCardIndex = i;
        // actually at this point just swap this 
        // card with the card at the back of the array
        break;
      }

    }

    // swap
    if (luckyCardFound){
      setLuckEffect("It's your lucky day!");
      setGotLucky(true);
      let tmpCard = luckyDeck[luckyDeck.length - 1];
      luckyDeck[luckyDeck.length - 1] = luckyDeck[luckCardIndex];
      luckyDeck[luckCardIndex] = tmpCard;
    }

    return luckyDeck;

  }
  //-----------------------------------------------------------------------
  const calculateBustOdds = () => {
    let bustCards = 0;
    // take all cards in the deck and see what happens if added to my hand
    deck.forEach((card) => {
      const testHand = [...playerHand, card];
      if (calculateScore(testHand) > 21) {
        bustCards++;
      }
    });
    return bustCards / deck.length;
  };
  //-----------------------------------------------------------------------
  const drawCard = () => {

    setDrawn(!drawn);
    setHitIconColor(pressedIconColor);
    setLuckEffect(cannedResponses[Math.floor(Math.random() * cannedResponses.length)]);
    setBeautyEffect("Your looks have no affect");
    setSmartsEffect("You have no idea what you're doing");
    // human hand stuff
    // luck stuff 
    // if lucky, find a card that can get you to blackjack (except aces)
    let curDeck = [...deck];
    let rndChance = Math.random();
    let luckChance = luckPoints / 10;

    if (rndChance < luckChance && Math.random() < 0.8){
        console.log("lucky draw!");
        curDeck = rollLuck([...deck]);
    }
    // beauty stuff
    // distract dealer and you can see his first card
    rndChance = Math.random();
    let beautyChance = beautyPoints / 10;

    if (dealerHand.length > 0
        && rndChance < beautyChance && Math.random() < 0.8
    ){
      let tmpDealerHand = [...dealerHand];
      tmpDealerHand.forEach((card)=>card.turned=true);
      setDealerHand([...tmpDealerHand]);
      setBeautyEffect("Your flustered the Dealer!");
      setGotPretty(true);
    }

    let cardDrawn = curDeck.pop();
    cardDrawn.turned = true;
    const newPlayerHand = [...playerHand, cardDrawn];
    setPlayerHand(newPlayerHand);
    updateScore(newPlayerHand, "human");

    // dealer hand stuff
    cardDrawn = curDeck.pop();
    cardDrawn.turned = true;
    if (firstDeal.current){
        firstDeal.current = false;
        cardDrawn.turned = false;
    }
    if (dealerScore < 17){
      const newDealerHand = [...dealerHand, cardDrawn];
      setDealerHand(newDealerHand);
      updateScore(newDealerHand, "dealer");
    }
    setDeck([...curDeck]); 
  }
  //-----------------------------------------------------------------------
  const stayAction =  () => {
    setStayIconColor(pressedIconColor);

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

    let condition = "";

    switch (true){
      case currentDealerScore > 21:
        condition = "WIN";
        break;
      case playerScore > currentDealerScore:
        condition = "WIN";
        break;
      case playerScore === currentDealerScore:
        condition = "TIE";
        break;
      case playerScore < currentDealerScore:
        condition = "LOSE";
        break;
      default:
        break;
    }

    setPlayerScore(condition);
    setDeck([...currentDeck]);
    setDealerScore(currentDealerScore);
    // flip over all of dealer cards
    dealerShowCqrds(currentDealerHand);
    setGameOver(true);
  }
  //-----------------------------------------------------------------------
  const hitButtonJSX = 
    <Pressable
      title="hit!"
      onPressIn={() => {
        drawCard();
      }}
      onPressOut={()=>{setHitIconColor(defaultIconColor)}}
    >
      <HitIcon 
        color={hitIconColor}
        width={100}
        height={100}
      />
    </Pressable>;
  //-----------------------------------------------------------------------
  const stayButtonJSX = 
    <Pressable
      title="stay!"
      onPressIn={stayAction}
      onPressOut={()=>{setStayIconColor(defaultIconColor)}}
    >
      <StayIcon 
        color={defaultIconColor}
        width={100}
        height={100}
      />
    </Pressable>;
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
    </Pressable>;
  //-----------------------------------------------------------------------
  // BJ Table JSX
  //-----------------------------------------------------------------------
    useEffect(()=>{
      firstDeal.current = true;
      setBeautyEffect("Are You Hot?");
      setSmartsEffect("Are you Rainman?");
      setLuckEffect("Are you Lucky?");
      setGotLucky(false);
      setGotPretty(false);
      setGotSmart(false);
      dealCards();
    },[reset]);                                       // re-render on reset

    useEffect(() => {
      const trueOdds = calculateBustOdds();
      const errorRange = ((10 - smartPoints) / 100) * (10-smartPoints);
      const min = trueOdds - errorRange;
      const max = trueOdds + errorRange;
      const filteredOdds = min + Math.random() * (max - min);
      const percentage = Math.round(filteredOdds * 100);
      console.log(trueOdds);
      setSmartsEffect(`Odds of Busting: ${percentage}%`);
      setGotSmart(true);

    }, [drawn]);

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
          {gameOver || firstDeal.current ? null : stayButtonJSX}
        </View>
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
  },
  deckOfCards : {
    marginTop: 200,
    marginRight: 150, 
    position: "relative",
  },
  dealerDeckOfCards : {
    flex: 1,
    marginRight: 20, 
    position: "relative",
  },
  playerDeckOfCards : {
    flex: 1,
    marginLeft: 20, 
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
  statsAreaAndInfo :{
    flexDirection: "column",
    padding: 20,
    alignSelf: "flex-end",
    zIndex: 10,
    backgroundColor: "#001c13c2",
    borderRadius: 10,
  },
  statsAreaText : {
    color: "#cfffef",
    textAlign: "flex-begin",
    fontSize: 15,
    fontFamily: "Futura",  
    
  },
  statsAreaTextHighlighted : {
    color: "#75ffd1",
    textAlign: "flex-begin",
    fontSize: 15,
    fontFamily: "Futura",    
  },
  dealerScoreDisplayStyle : {
    padding: 20,
    alignSelf: "flex-start",
    color: "#01C987",
    textAlign: "center",
    fontSize: 100,
    fontFamily: "Futura"  
  },
});

export default BlackJackTable;