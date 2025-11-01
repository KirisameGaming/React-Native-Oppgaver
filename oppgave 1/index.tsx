import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>En app</Text>
      <View style={styles.flex}>
        <View style={styles.left}></View>
        <View style={styles.center}></View>
        <View style={styles.right}></View>
      </View>
      <Text style={styles.text}>Tekst som er uten mening!</Text>
      <TouchableOpacity style={styles.button}> {/* Bruker TouchableOpacity i stedet for Button for bedre kontroll over styles */}
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    padding: 30,
    fontWeight: "bold",
    backgroundColor: "red",
    color: "#FFFFFF",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  left: {
    alignItems: "flex-start",
    width: 50,
    height: 50,
    backgroundColor: "#00FF00",
  },
  center: {
    top: 50,
    width: 50,
    height: 50,
    backgroundColor: "#FFFF00",
  },
  right: {
    alignItems: "flex-end",
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: "#000000",
  },
  text: {
    marginTop: 150,
    fontSize: 20,
    width: "50%",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 300,
    backgroundColor: "blue",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});