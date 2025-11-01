import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [antallSpesialtegn, setAntallSpesialtegn] = useState(0);
  const [sistAntallSpesialtegn, setSistAntallSpesialtegn] = useState(0);
  const [antallTegn, setAntallTegn] = useState(0);
  const [passord, setPassord] = useState("");
  const [isEnabledStoreBokstaver, setIsEnabledStoreBokstaver] = useState(false);
  const [isEnabledSmaaBokstaver, setIsEnabledSmaaBokstaver] = useState(false);
  const [isEnabledTall, setIsEnabledTall] = useState(false);
  const [isEnabledSpesialtegn, setIsEnabledSpesialtegn] = useState(false);


  // Funksjon for å generere tilfeldig passord
  function genererPassord(isSmaaBokst:boolean, isStoreBokst:boolean, isTall:boolean, isSymb:boolean, antTegn:number) {    
    let smaaBokstaver = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let storeBokstaver = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let tall = ["0","1","2","3","4","5","6","7","8","9"]
    let spesialtegn = ["#","$","%","&","*","@","!","?","+","-","_","=",".",",","^","~","/"]
    let lovligeTegn:Array<string> = []
    
    if (isSmaaBokst) {
      lovligeTegn = lovligeTegn.concat(smaaBokstaver);
    }
    if (isStoreBokst) {      
      lovligeTegn = lovligeTegn.concat(storeBokstaver);
    }
    if (isTall) {      
      lovligeTegn = lovligeTegn.concat(tall);
    }
    let passord = []

    let passordString = "";

    if (isSymb && !Number.isNaN(antallSpesialtegn)) 
    {
      for (let i = 0; i < antTegn - antallSpesialtegn; i++) {
        passord.push(lovligeTegn[Math.floor(Math.random() * lovligeTegn.length)])
      }
      if (antallSpesialtegn > 0) {
        for (let j = 0; j < antallSpesialtegn; j++) {
          passord.splice(Math.floor(Math.random() * passord.length), 0, spesialtegn[Math.floor(Math.random() * spesialtegn.length)]);
        }
      }
    }
    else
    {
      for (let i = 0; i < antTegn; i++) {
        passord.push(lovligeTegn[Math.floor(Math.random() * lovligeTegn.length)])
      }
    }
    passordString = passord.join('');
    console.log(antallSpesialtegn);
    console.log(passordString);

    return passordString;
  }

  function antallTegnTilNumber(text:string) {
    const antallTegnNumber = fixNaN(parseInt(text.replace(/[^0-9]/g, '')));
    setAntallTegn(antallTegnNumber);
  }

  function antallSpesialtegnTilNumber(text:string) {
    const antallSpesialtegnNumber = fixNaN(parseInt(text.replace(/[^0-9]/g, '')));
    setAntallSpesialtegn(antallSpesialtegnNumber);
  }

  function dismissEvent() {
    if (isEnabledSpesialtegn && antallSpesialtegn != sistAntallSpesialtegn)
    {
      setPassord(genererPassord(isEnabledSmaaBokstaver, 
              isEnabledStoreBokstaver, isEnabledTall, isEnabledSpesialtegn, antallTegn))
      setSistAntallSpesialtegn(antallSpesialtegn);
    }
  }

  function fixNaN(number:number) {
    return isNaN(number) ? 0 : number;
  }

  useEffect(() => {
  const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      dismissEvent();
  });

  return () => {
    hideSubscription.remove();
  }

  })

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
  <View style={ styles.screen }>
    <View style={ styles.container1 } >                    
      <Text style={ styles.text_heading}> 
        Passordgenerator
      </Text>         
    </View>
    <View style={ styles.container2 }>
      <View style={ styles.line}>
        <Text style={ styles.text_line} >
          Store bokstaver
        </Text>
        <Switch
          thumbColor= {isEnabledStoreBokstaver ? "#f4f310" : "#f4f3f4"}        
          onValueChange={() => setIsEnabledStoreBokstaver(!isEnabledStoreBokstaver)}
          value={isEnabledStoreBokstaver}
        />
      </View>    
      <View style={ styles.line}>
        <Text style={ styles.text_line} >
          Små bokstaver
        </Text>
        <Switch
          thumbColor= {isEnabledSmaaBokstaver ? "#f4f310" : "#f4f3f4"}         
          onValueChange={() => setIsEnabledSmaaBokstaver(!isEnabledSmaaBokstaver)}
          value={isEnabledSmaaBokstaver}
        />
      </View>    
      <View style={ styles.line}>
        <Text style={ styles.text_line} >
          Tall
        </Text>
        <Switch
          thumbColor= {isEnabledTall ? "#f4f310" : "#f4f3f4"}         
          onValueChange={() => setIsEnabledTall(!isEnabledTall)}
          value={isEnabledTall}
        />
      </View>    
      <View style={ styles.line }>
        <Text style={ styles.text_line } >
          Spesialtegn
        </Text>
        <Switch
          thumbColor= {isEnabledSpesialtegn ? "#f4f310" : "#f4f3f4"}        
          onValueChange={() => setIsEnabledSpesialtegn(!isEnabledSpesialtegn)}
          value={isEnabledSpesialtegn}
        />        
      </View>
      <View style={ styles.line }>
        <Text style={ styles.text_line }>
          Antall tegn
        </Text>
        <TextInput 
          style={ styles.input } 
          keyboardType="numeric"
          onChangeText={antallTegnTilNumber}
        />    
      </View>
      <View style={ styles.line }>
        <Text style={ styles.text_line }>
          Antall spesialtegn
        </Text>
        <TextInput 
          style={ styles.input } 
          keyboardType="numeric"
          onChangeText={antallSpesialtegnTilNumber}
        />    
      </View>
    </View>
    <View style={ styles.container4 }>
    <Button
        title="Generer passord"
        onPress={() => setPassord(genererPassord(isEnabledSmaaBokstaver, 
            isEnabledStoreBokstaver, isEnabledTall, isEnabledSpesialtegn, antallTegn))}
      />
    </View>
    <View style={ styles.container4 }>
    <Button
        title="Kopier"
        onPress={() => Clipboard.setStringAsync(passord)}
      />
    </View>
    <View style={ styles.container3 }>
      <Text style={ styles.text_line2 }>
        Passord:
      </Text> 
      <Text style={ styles.text_line3 } selectable={true}>
        {passord}
      </Text>
    </View>    
  </View>
  </TouchableWithoutFeedback>
  );
  }

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1, 
  },
  container1: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 2,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  container3: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container4: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    padding: 10, 
    fontSize: 20,
    width: 60,
    backgroundColor: "#f5f5f5",
  },
  text_heading: {
    color: "white",
    fontSize: 35,
  },
  text_line: {
    color: "black",
    fontSize: 20,
  },
  text_line2: {
    color: "black",
    fontSize: 20,
  },
  text_line3: {
    color: "white",
    fontSize: 20,
    backgroundColor: "grey",
    width: 260,
  },
});
