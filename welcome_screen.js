import { View, Text, StyleSheet, Pressable} from "react-native";
import BackgroundSvg from './assets/welcome_page/black_jack_attack.svg'; 
import SpadeLogo from "./assets/welcome_page/SpadeLogo";
import { useState } from "react";

function WelcomeScreen({navigation}) {

  const defaultSpadeBgColor = "#01C987";
  const defaultSpadeColor = "#071410";
  const defaultSpadeSize = 150;

  //-----------------------------------------------------------------------
  // UseState Related Content
  //-----------------------------------------------------------------------

  const [spadeColor, setSpadeColor] = useState(defaultSpadeColor);
  const [spadeBgColor, setSpadeBgColor] = useState(defaultSpadeBgColor);
  const [spadeSize, setSpadeSize] = useState(defaultSpadeSize);

  //-----------------------------------------------------------------------
  // Welcome Screen Related Methods
  //-----------------------------------------------------------------------
  const handleSpadeButtonClick = () => {
    // we can probably access svg hex colors 
    // and change them dynamically
    // change svg size as well
    setSpadeBgColor("#071410");
    setSpadeColor("#01C987");
  }

  const handleSpadeButtonClickOff = () => {
    setSpadeBgColor(defaultSpadeBgColor);
    setSpadeColor(defaultSpadeColor);
    navigation.navigate("PlayerCreation");
  }

  //-----------------------------------------------------------------------
  // Welcome Screen JSX
  //-----------------------------------------------------------------------
    return (
        <View style={styles.welcomeParent}>

            <BackgroundSvg 
                width="100%" 
                height="100%" 
                preserveAspectRatio="xMidYMid slice"
                style={styles.svgBackground} 
            />

            <View style={styles.rootContainer}>
                <View style={styles.spadeButton}>

                  <Pressable 
                    onPressIn={handleSpadeButtonClick}
                    onPressOut={handleSpadeButtonClickOff}
                    title="enter"
                  >
                    <SpadeLogo 
                      width={spadeSize} 
                      height={spadeSize}
                      circleColor={spadeBgColor}
                      spadeColor={spadeColor} 
                    />
                  </Pressable>

                </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>
                  BLACK JACK +
                </Text>
              </View>

            </View> 

        </View>
    );

}

//-----------------------------------------------------------------------
// Style Sheet For Welcome Page
//-----------------------------------------------------------------------
const styles = StyleSheet.create({
  welcomeParent: {
    flex: 1,
  },
  svgBackground: {
      position: "absolute",
    },
  rootContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    //borderWidth: 2,
    //borderColor: "purple",
    justifyContent: "flex-end",
  },
  titleTextContainer: {
    //borderWidth: 2,
    //borderColor: "red",
    marginBottom: 50,
  },
  spadeButton:{
    //borderWidth: 2,
    alignSelf: "center",
    //borderColor: "green",
    margin: 15,
  },
  titleText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontFamily: "Futura",
  },
});

//-----------------------------------------------------------------------
// Export Welcome Screen
//-----------------------------------------------------------------------
export default WelcomeScreen;