import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BackgroundSvg from './assets/player_craeation_page/player_creation_bg.svg'; 
import NameButton from './assets/player_craeation_page/streamline-cyber--masks.svg'
import IntelligenceButton from './assets/player_craeation_page/streamline-cyber--elephant.svg'
import BeautyButton from './assets/player_craeation_page/streamline-cyber--dna-strand.svg'
import LuckButton from './assets/player_craeation_page/streamline-cyber--cards-2.svg'
import AddButton from './assets/player_craeation_page/streamline-cyber--add-hexagon-1.svg'
import RemoveButton from './assets/player_craeation_page/streamline-cyber--remove-hexagon.svg'
import TestTube from './assets/player_craeation_page/streamline-cyber--beaker-test-tube.svg'
import Begin from './assets/player_craeation_page/start.svg'


function PlayerCreation({
    navigation,
    playerName,
    setPlayerName,
    smartPoints,
    setSmartPoints,
    beautyPoints,
    setBeautyPoints,
    luckPoints,
    setLuckPoints
}) {

  const primaryColor = "#00ffaa";
  const pressedColor = "#01C987";
  const bgColor = "#071410";
  const playColor = "#8af6d2";
  const buttonSize = 50;
  const maxPoints = 10;

  //-----------------------------------------------------------------------
  // UseState Related Content
  //-----------------------------------------------------------------------

  const [nameButtonColor, setNameButtonColor] = useState(playColor);
  const [playButtonColor, setPlayButtonColor] = useState(playColor);
  const [statPoints, setStatPoints] = useState(maxPoints);


  //-----------------------------------------------------------------------
  // Player Creation Related Content / Methods
  //-----------------------------------------------------------------------
  
  const handlePlayerNameButtonClick = () => {
    // console.log("player button clicked");
    // setNameSet(!nameSet);
    // nameSet ? 
    //   setNameButtonColor(nameConfirmedColor) :
    //   setNameButtonColor(primaryColor);
  }
  
  // actually probably not going to have these as buttons
  // if more time they can explain what each skill does if press
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

  const increaseDecreaseAmnt = (points, setPoints) => {
  
    const handleAdd = () => {
      if (statPoints <= 0){
        return;
      }
      setPoints(points + 1);
      setStatPoints(statPoints - 1);
    }

    const handleSubtract = () => {
      if (points <= 0){
        return;
      }
        setStatPoints(statPoints + 1);
        setPoints(points - 1);
      }
    
    
    // pressed is a deconstructed field if you wrap a child of a 
    // pressable in a function you can get the info about that child.   

    return(
      <View style={styles.innerButtonRow}>

        <Pressable 
          title="addButton"
          style={styles.addSign}
          onPress={handleAdd}
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

        <Pressable 
          title="RemoveButton"
          style={styles.addSign}
          onPress={handleSubtract}
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
    

        <Text style={styles.assignedPoints}>
          {points}
        </Text>
        
      </View>
    ); 
  };

  //-----------------------------------------------------------------------

  const handleBeginGameEvent= () => {
    setPlayButtonColor(playColor);
    navigation.navigate("BlackJackTable");
  };

  const beginButton = 
    <View style={styles.playButtonContainer}>
      <Pressable
        title="BeginButton"
        onPressIn={()=>{setPlayButtonColor(pressedColor)}}
        onPressOut={handleBeginGameEvent}
      >
        <Begin 
          width={buttonSize * 3} 
          height={buttonSize * 3}
          color={playButtonColor}
          style={styles.beginStyle}
        />
      </Pressable>
    </View> ;

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
              <TestTube 
                width={buttonSize / 2} 
                height={buttonSize / 2}
                color={nameButtonColor}
              />
              <Text style={styles.titleText}>
                Create Player
              </Text>
            </View>
              
            <View style={styles.buttonViews}>

              <View style={styles.buttonRow}>
                <View style={styles.buttonCol}>
                  {playerNameButton}
                  <Text style={styles.buttonText}>
                    Name
                  </Text>
                </View>
                {playerNameField}
              </View>

              <View style={styles.buttonRow}>
               <View style={styles.buttonCol}>
                {playerIntelligenceButton}
                <Text style={styles.buttonText}>
                  Smarts
                </Text>
              </View> 
                {increaseDecreaseAmnt(smartPoints, setSmartPoints)}
              </View>
             
              <View style={styles.buttonRow}>
                <View style={styles.buttonCol}>
                  {playerBeautyButton}
                  <Text style={styles.buttonText}>
                    Beauty
                  </Text>                
                </View>
                  {increaseDecreaseAmnt(beautyPoints, setBeautyPoints)} 
              </View>

              <View style={styles.buttonRow}>
                <View style={styles.buttonCol}>
                  {playerLuckButton}
                  <Text style={styles.buttonText}>
                    Luck
                  </Text>     
                </View>
                  {increaseDecreaseAmnt(luckPoints, setLuckPoints)} 
              </View>

             {beginButton}

            </View> 

              <View style={styles.statView}>
                <Text style={styles.statText}>
                  {statPoints}
                </Text>     
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
    flex: 1,
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
    // borderColor: "orange",
  },
  innerButtonRow:{
    flex: 1,
    flexDirection : "row",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "orange",
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
  },
  statView :{
    flexDirection: "row",
    alignItems: "flex-end"
  },
  statText :{
    color: "#01C987",
    textAlign: "center",
    fontSize: 100,
    fontFamily: "Futura",
    // borderWidth: 2,
    // borderColor: "pink",
  },
  addSign : {
    alignSelf: "center",
    // borderWidth: 2,
    // borderColor: "yellow",
  },
  assignedPoints :{
    paddingLeft: 20,
    color: "#01C987",
    fontSize: 65,
    fontFamily: "Futura",
    minWidth: 100,
  },
  beginStyle :{
    alignSelf: "center",
    fontSize: 38,
    fontFamily: "Futura",
  },
  playButtonContainer:{
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "orange",
  },


});

//-----------------------------------------------------------------------
// Export Welcome Scrreen
//-----------------------------------------------------------------------
export default PlayerCreation;