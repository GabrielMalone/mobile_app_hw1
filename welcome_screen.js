import { View, Text, StyleSheet, Pressable} from "react-native";
import BackgroundSvg from './assets/welcome_page/black_jack_attack.svg'; 
import SpadeSvg from "./assets/welcome_page/spadeLogo.svg";

function WelcomeScreen() {


  //-----------------------------------------------------------------------
  // Welcome Screen Related Methods
  //-----------------------------------------------------------------------
  const handleSpadeButtonClick = () => {
    console.log("Button Pressed!")
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
                    onPress={handleSpadeButtonClick}
                    title="enter"
                  >
                    <SpadeSvg width={150} height={150} />
                  </Pressable>
                </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>BLACK JACK ATTACK</Text>
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
    margin: 5,
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