import { useState } from "react";
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity} from "react-native";

export default function Index() {
  
  const [count, setCount] = useState(0);
  
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={increase} style={styles.button}>
        <Text style={styles.text}>Øk teller</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={decrease} style={styles.button}>
        <Text style={styles.text}>Reduser teller</Text>
      </TouchableOpacity>

      <Text style={styles.text2}>Teller er:</Text>
      <View style={styles.counter}>
        <Text style={styles.counterText}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#487281",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 8,
  },
  counter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#D8DBE2",
  },
  counterText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  }
});