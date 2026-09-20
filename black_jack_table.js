import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";
import { calculateScore } from "./game_components/score_calculator";
import { cannedResponses } from "./game_components/canned_responses";
import { styles } from "./game_components/style";
import AddButton from './assets/player_craeation_page/streamline-cyber--add-hexagon-1.svg'
import RemoveButton from './assets/player_craeation_page/streamline-cyber--remove-hexagon.svg'
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
  const buttonSize = 25;
  const deckStart = createDeck();
  const defaultIconColor = "#02895c";
  const pressedIconColor = "#01C987";
  const primaryColor = "#f3f8f6";
  const pressedColor = "#01C987";
  const winMultiplier = 2;

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
  const [money, setMoney] = useState(100);
  const [pot, setPot] = useState(0);
  const [betAmnt, setBetAmnt] = useState(0);
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
  const handleIncreaseBet = () => {
    let curBet = betAmnt;
    curBet += 10;
    if (curBet > money){
      curBet = money;
    }
    if (curBet < 0){
      curBet = 0;
    }
    setBetAmnt(curBet);
  }
  //-----------------------------------------------------------------------
  const increaseBet = 
      <Pressable 
        title="increaseBetButton"
        style={styles.addSign}
        onPress={handleIncreaseBet}
      >
        { ( {pressed} ) => (
            <AddButton 
              width={buttonSize} 
              height={buttonSize}
              color={pressed ? pressedColor : primaryColor}
            />
          )
        }
      </Pressable>
  ;
  //-----------------------------------------------------------------------
    //-----------------------------------------------------------------------
  const handleDecreaseBet = () => {
    let curBet = betAmnt;
    curBet -= 10;
    if (curBet < 0){
      curBet = 0;
    }
    setBetAmnt(curBet);
  }
  //-----------------------------------------------------------------------
  const decreaseBet = 
      <Pressable 
        title="decraseBetButton"
        style={styles.minusSign}
        onPress={handleDecreaseBet}
      >
        { ( {pressed} ) => (
            <RemoveButton 
              width={buttonSize} 
              height={buttonSize}
              color={pressed ? pressedColor : primaryColor}
            />
          )
        }
      </Pressable>
  ;
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
          Beauty ({beautyPoints}): {beautyEffect}
        </Text>
      <Text 
        style={gotSmart ? 
        styles.statsAreaTextHighlighted : 
        styles.statsAreaText}
      >
        Smarts ({smartPoints}): {smartsEffect}</Text>
      <Text 
        style={gotLucky ? 
          styles.statsAreaTextHighlighted : 
          styles.statsAreaText}
        >
          Luck ({luckPoints}): {luckEffect}
      </Text>
      <View
        style={styles.moneyArea}
      >
        <Text
        style={styles.statsAreaMoney}
        >
          ${money} | ${pot}
        </Text>
          <View
            style={styles.betArea}
          >
          <Text
            style={styles.statsAreaBet}
          >
            ${betAmnt}
          </Text>
          {increaseBet}
          {decreaseBet}
        </View>
      </View>
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
          setMoney(money - pot);
          
        } else if (score === 21) {
          console.log("Player Black Jack!");
          setPlayerScore("WIN");
          dealerShowCqrds();
          setMoney(money + pot);
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
          setMoney(money + pot);
   
        } else if (score === 21) {
          console.log("dealer Black Jack!");
          dealerShowCqrds();
          setGameOver(true);
          setMoney(money - pot);
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
    //---------------------------------------------------------------------
    // bet effects here i think
    //---------------------------------------------------------------------
    setPot(pot + (betAmnt * winMultiplier));
    setMoney(money - betAmnt);
    //---------------------------------------------------------------------
    setDrawn(!drawn);
    setHitIconColor(pressedIconColor);
    setLuckEffect("no");
    setBeautyEffect("Your looks have no effect");
    setSmartsEffect("You have no idea what you're doing");
    //---------------------------------------------------------------------
    // human hand stuff
    //---------------------------------------------------------------------
    let curDeck = [...deck];
    //---------------------------------------------------------------------
    // luck stuff 
    //---------------------------------------------------------------------
    // if lucky, find a card that can get you to blackjack (except aces)
    //---------------------------------------------------------------------
    let rndChance = Math.random();
    let luckChance = luckPoints / 10;
    if (rndChance < luckChance && Math.random() < 0.8){
        console.log("lucky draw!");
        curDeck = rollLuck([...deck]);
    }
    //---------------------------------------------------------------------
    // beauty stuff
    //---------------------------------------------------------------------
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
    //---------------------------------------------------------------------
    let cardDrawn = curDeck.pop();
    cardDrawn.turned = true;
    const newPlayerHand = [...playerHand, cardDrawn];
    setPlayerHand(newPlayerHand);
    updateScore(newPlayerHand, "human");
    //---------------------------------------------------------------------
    // dealer hand stuff
    //---------------------------------------------------------------------
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
    //---------------------------------------------------------------------
    // clean up
    //---------------------------------------------------------------------
    setDeck([...curDeck]); 
    setBetAmnt(0);
  }
  //-----------------------------------------------------------------------
  const stayAction =  () => {
    setStayIconColor(pressedIconColor);

    // maybe can't bet on stay action 

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
        setMoney(money + pot);
        break;
      case playerScore > currentDealerScore:
        condition = "WIN";
        setMoney(money + pot);
        break;
      case playerScore === currentDealerScore:
        condition = "TIE";
        setMoney(money + (pot/2));
        break;
      case playerScore < currentDealerScore:
        condition = "LOSE";
        setMoney(money - pot);
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
      setBeautyEffect("Are you hot?");
      setLuckEffect("Are you lucky?");
      setSmartsEffect("Can you count cards?");
      setGotLucky(false);
      setGotPretty(false);
      setGotSmart(false);
      dealCards();
      setBetAmnt(0);
      setPot(0);
    },[reset]);                                       // re-render on reset

    useEffect(() => {
      // smart effect stuff here. calculate odds of busting each draw
      const trueOdds = calculateBustOdds();
      const errorRange = ((10 - smartPoints) / 100) * (10-smartPoints);
      const min = trueOdds - errorRange;
      const max = trueOdds + errorRange;
      const filteredOdds = min + Math.random() * (max - min);
      const percentage = Math.round(filteredOdds * 100);
      console.log(trueOdds);
      if(!firstDeal.current)
        setSmartsEffect(`Odds of busting: ${percentage}%`);
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

export default BlackJackTable;