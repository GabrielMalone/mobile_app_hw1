import { View, Text, StyleSheet} from "react-native";

function Card(){

    return (
        <View style={styles.card}>
            <Text>Hello</Text>
        </View>
    );

}

const styles = StyleSheet.create({

  card: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",

  },
});

export default Card;