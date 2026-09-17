import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

import WelcomeScreen from "./welcome_screen";
import PlayerCreationScreen from "./player_creation";
import BlackJackTable from "./black_jack_table";

const Stack = createNativeStackNavigator();

export default function App() {

  const [playerName, setPlayerName] = useState("Player");
  const [smartPoints, setSmartPoints] = useState(0);
  const [beautyPoints, setBeautyPoints] = useState(0);
  const [luckPoints, setLuckPoints] = useState(0);

  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={
            {headerShown: false}
          }
        >

          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen name="PlayerCreation" >
          {(props) => {
            return (
              <PlayerCreationScreen
                {...props}
                playerName={playerName}
                setPlayerName={setPlayerName}
                smartPoints={smartPoints}
                setSmartPoints={setSmartPoints}
                beautyPoints={beautyPoints}
                setBeautyPoints={setBeautyPoints}
                luckPoints={luckPoints}
                setLuckPoints={setLuckPoints}
              />
            )}}
          </Stack.Screen>
          <Stack.Screen name="BlackJackTable">
           {(props) => {
            return (
              <BlackJackTable
                {...props}
                playerName={playerName}
                smartPoints={smartPoints}
                beautyPoints={beautyPoints}
                luckPoints={luckPoints}
              />
            )}}    
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
