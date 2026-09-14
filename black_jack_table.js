import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BackgroundSvg from './assets/player_craeation_page/player_creation_bg.svg'; 
import createDeck from "./createDeck";
import shuffleDeck from "./shuffle";
import CardBack from './assets/card_assets/poker-qr/cardBack.svg'


function BlackJackTable() {

  const playingCardWidth = 120;
  const playingCardHeight = 120 * (88/63);
  const deck = createDeck();

  shuffleDeck(deck);


  //-----------------------------------------------------------------------
  // UseState Related Content
  //-----------------------------------------------------------------------


  //-----------------------------------------------------------------------
  // Player Creation Related Content / Methods
  //-----------------------------------------------------------------------


  const placeCardsOntable =
      <View style={styles.deckOfCards}>
        {deck.map((card, i)=>{
          // since we have an SVG
          const CardImage = card.image;
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
  // Player Creation JSX
  //-----------------------------------------------------------------------
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
          {placeCardsOntable}
          <CardBack 
            style={styles.cardStack}
            width={playingCardWidth}
            height={playingCardHeight}
          />

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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#071410",
  },
  svgBackground: {
    position: "absolute",
    bottom: -200,
    opacity: 0.4,
  },
  deckOfCards : {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "pink",
    position: "relative",
  },
  cardStack : {
    position: "absolute",
  },

});

//-----------------------------------------------------------------------
// Export Welcome Scrreen
//-----------------------------------------------------------------------
export default BlackJackTable;