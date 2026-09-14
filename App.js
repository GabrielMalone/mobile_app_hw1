import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import WelcomeScreen from "./welcome_screen";
import PlayerCreationScreen from "./player_creation";
import BlackJackTable from "./black_jack_table";

const Stack = createNativeStackNavigator();

export default function App() {


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
          <Stack.Screen
            name="PlayerCreation"
            component={PlayerCreationScreen}
          />
          <Stack.Screen
            name="BlackJackTable"
            component={BlackJackTable}
          />
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
