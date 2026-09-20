import { StyleSheet } from "react-native";
//-----------------------------------------------------------------------
// Style Sheet For Welcome Page
//-----------------------------------------------------------------------
export const styles = StyleSheet.create({
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
    color: "#75ffd1",
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

  statsAreaBet:{
    color: "#fcfcfd",
    textAlign: "flex-begin",
    fontSize: 30,
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
  moneyArea : {
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#01C987",
    marginTop: 10,
  },
  statsAreaMoney:{
    color: "#fff67557",
    textAlign: "flex-begin",
    fontSize: 55,
    fontFamily: "Futura", 
    alignSelf: "center",  
  },
  betArea : {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  addSign:{
    marginLeft: 10,
  },
  minusSign:{
    marginLeft: 5,
  }
});