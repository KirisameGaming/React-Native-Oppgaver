import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export default function Index() {
    const [text, setText] = useState('');
    const validPassword = text.length >= 5;
  return (
    <View>
        <Text style={styles.header}>Passord</Text>
        <Text style={styles.text}>Skriv inn passordet ditt:</Text>
        <TextInput secureTextEntry style={styles.input} onChangeText={setText}/>
        <Text style={styles.text}>Passordet ditt er: {text}</Text>
        {validPassword ? null : <Text style={styles.text}>Passordet må minst ha 5 tegn</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    padding: 30,
    fontWeight: "bold",
    backgroundColor: "#373F51",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 12,
  },
  text: {
  marginTop: 50,
  fontSize: 20,
  fontWeight: "bold",
  paddingHorizontal: 10,
    },
});