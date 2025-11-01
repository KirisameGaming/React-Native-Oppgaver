import { Image, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/thinking-cat-douglas-sacha.jpg" }}
        style={{ width: 400, height: 350}}
      />
      <Image
        source={require("../assets/images/image.png")}
        style={{ width: 400, height: 350}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center", 
    justifyContent: "center",
    gap: 30,
  }
});