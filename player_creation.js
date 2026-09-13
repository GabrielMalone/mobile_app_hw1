import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BackgroundSvg from './assets/player_craeation_page/player_creation_bg.svg'; 
import NameButton from './assets/player_craeation_page/streamline-cyber--masks.svg'
import IntelligenceButton from './assets/player_craeation_page/streamline-cyber--elephant.svg'
import BeautyButton from './assets/player_craeation_page/streamline-cyber--dna-strand.svg'
import LuckButton from './assets/player_craeation_page/streamline-cyber--cards-2.svg'

function PlayerCreation() {

  const primaryColor = "#01C987";
  const nameConfirmedColor = "#00ffaa";
  const bgColor = "#071410"
  const buttonSize = 50;

  //-----------------------------------------------------------------------
  // UseState Related Content
  //-----------------------------------------------------------------------

  const [nameButtonColor, setNameButtonColor] = useState(primaryColor);
  const [nameSet, setNameSet] = useState(true);
  const [playerName, setPlayerName] = useState("");

  //-----------------------------------------------------------------------
  // Player Creation Related Content / Methods
  //-----------------------------------------------------------------------
  

  const handlePlayerNameButtonClick = () => {
    console.log("player button clicked");
    setNameSet(!nameSet);
    nameSet ? 
      setNameButtonColor(nameConfirmedColor) :
      setNameButtonColor(primaryColor);
  }

  const playerNameButton = 
    <Pressable 
      onPressIn={handlePlayerNameButtonClick}
      title="playerNameButton"
    >
      <NameButton 
        width={buttonSize} 
        height={buttonSize}
        color={nameButtonColor}
      />
    </Pressable>;

  //-----------------------------------------------------------------------

  const playerIntelligenceButton = 
    <Pressable 
      title="playerIntelligenceButton"
    >
      <IntelligenceButton 
        width={buttonSize} 
        height={buttonSize}
        color={nameButtonColor}
      />
    </Pressable>;

  //-----------------------------------------------------------------------

  const playerBeautyButton = 
    <Pressable 
      title="playerBeautyButton"
    >
      <BeautyButton 
        width={buttonSize} 
        height={buttonSize}
        color={nameButtonColor}
      />
    </Pressable>; 

  //-----------------------------------------------------------------------

  const playerLuckButton = 
    <Pressable 
      title="playerLuckButton"
    >
      <LuckButton 
        width={buttonSize} 
        height={buttonSize}
        color={nameButtonColor}
      />
    </Pressable>; 

  //-----------------------------------------------------------------------

  const playerNameField = 
      <TextInput
        style={styles.nameInputText}
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Enter Your Name"
        placeholderTextColor="#01C987"
      />

  //-----------------------------------------------------------------------
  // Player Creation JSX
  //-----------------------------------------------------------------------
    return (
        <SafeAreaView 
          style={styles.playerCreationParent}
          edges={["top"]}
        >
            <BackgroundSvg 
                width="100%" 
                height="100%" 
                preserveAspectRatio="xMidYMid slice"
                style={styles.svgBackground} 
            />

            <View style={styles.titleView}>
              <Text style={styles.titleText}>Create Player</Text>
            </View>
              
            <View style={styles.buttonViews}>

              <View style={styles.buttonRow}>
                <View style={styles.buttonCol}>
                  {playerNameButton}
                  <Text style={styles.buttonText}
                    >Name
                  </Text>
                </View>
                {playerNameField}
              </View>

               <View style={styles.buttonCol}>
                {playerIntelligenceButton}
                <Text style={styles.buttonText}
                  >Smarts
                </Text>
              </View> 

              <View style={styles.buttonCol}>
                {playerBeautyButton}
                <Text style={styles.buttonText}
                  >Beauty
                </Text>                
              </View> 

              <View style={styles.buttonCol}>
                {playerLuckButton}
                <Text style={styles.buttonText}
                  >Luck
                </Text>     

              </View> 

            </View>
        </SafeAreaView>

    );

}

//-----------------------------------------------------------------------
// Style Sheet For Welcome Page
//-----------------------------------------------------------------------
const styles = StyleSheet.create({
  playerCreationParent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#071410",
    // borderWidth: 2,
    // borderColor: "green",
  },
  svgBackground: {
    position: "absolute",
    bottom: -10,
    opacity: 0.4,
  },
  titleView:{
    // borderWidth: 2,
    // borderColor: "red",
  },
  titleText:{
    color: "#01C987",
    fontSize: 48,
    fontFamily: "Futura",
  },
  buttonViews :{
    flex: 0.5,
    flexDirection: "column",
    alignSelf: "stretch",
    // borderWidth: 2,
    // borderColor: "yellow",
    paddingLeft: 45,
    paddingTop: 45,
  },
  buttonCol:{
    flexDirection : "column",
    alignSelf: "flex-start",
    margin: 10,
    // borderWidth: 2,
    // borderColor: "purple",
  },
  buttonRow:{
    flexDirection : "row",
    // borderWidth: 2,
    // borderColor: "pink",
  },
  buttonText:{
    alignSelf: "center",
    paddingTop: 5,
    color: "#01C987",
    fontSize: 10,
    fontFamily: "Futura",
  },
  nameInputText:{
    flex: 1,
    color: "#01C987",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Futura",
  }

});

//-----------------------------------------------------------------------
// Export Welcome Scrreen
//-----------------------------------------------------------------------
export default PlayerCreation;