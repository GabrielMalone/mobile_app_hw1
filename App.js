import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useReducer } from "react";

import WelcomeScreen from "./welcome_screen";
import PlayerCreationScreen from "./player_creation";
import BlackJackTable from "./black_jack_table";

const Stack = createNativeStackNavigator();

export default function App() {

  // need to make a reducer function instead

  // const [playerName, setPlayerName] = useState("Player");
  // const [smartPoints, setSmartPoints] = useState(0);
  // const [beautyPoints, setBeautyPoints] = useState(0);
  // const [luckPoints, setLuckPoints] = useState(0);
  
  // first input, reducer, is a function that we will define
  // then the swecond argument is the initiaal state of the state object
  // the shape of state is going to match the shape of the second object we pass in

  function reducer(state, action) {
    // this is the shape of the state: {playerName: "", smartPoints: 0, luckPoints: 0, beautyPoints: 0 }
    // this is the shape of the action: {statToChange: , ammount}
    // the goal of this function is to return a javascrip object 
    // that represents what the new value of the state should be
    // can be a switch statement
    switch(action.statToChange){
      case 'playerName'   : return {...state, playerName: action.amount};
      case 'smartPoints'  : return {...state, smartPoints: (state.smartPoints + action.amount)};
      case 'luckPoints'   : return {...state, luckPoints: (state.luckPoints + action.amount)};
      case 'beautyPoints' : return {...state, beautyPoints: (state.beautyPoints + action.amount)};
      default: return state;
    }
  }

  const [state, dispatch] = 
    useReducer(reducer, 
      {
        playerName: "", 
        smartPoints: 0, 
        beautyPoints: 0, 
        luckPoints: 0
      });


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
                // playerName={playerName}
                // setPlayerName={setPlayerName}
                // smartPoints={smartPoints}
                // setSmartPoints={setSmartPoints}
                // beautyPoints={beautyPoints}
                // setBeautyPoints={setBeautyPoints}
                // luckPoints={luckPoints}
                // setLuckPoints={setLuckPoints}
                state={state}
                dispatch={dispatch}
              />
            )}}
          </Stack.Screen>
          <Stack.Screen name="BlackJackTable">
           {(props) => {
            return (
              <BlackJackTable
                {...props}
                // playerName={playerName}
                // smartPoints={smartPoints}
                // beautyPoints={beautyPoints}
                // luckPoints={luckPoints}
                state={state}
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
