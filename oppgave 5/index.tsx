import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert, ImageBackground} from "react-native";
import * as Location from 'expo-location';

export default function Index() {
  const [firstTime, setFirstTime] = useState(true);
  const [city, setCity] = useState("---");
  const [weatherStatus, setStatus] = useState("Henter informasjon...");
  const [temperatur, setTemperatur] = useState("---");

  let weatherImage = require('./clear.jpg');
  const [weatherCode, setWeatherCode] = useState(800);

  const getWeather = async (cityInput:String = "") => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (cityInput === "" && status === 'granted') {
      Location.getCurrentPositionAsync().then((location) => {
        const { latitude, longitude } = location.coords;
        console.log(latitude, longitude);
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3dd481e1ac127e7b76c2dfea2bea1505&units=metric&lang=no`)
          .then(response => response.json())
          .then(data => {
            setCity(data.name);
            setStatus(data.weather[0].description);
            setTemperatur(data.main.temp + " °C");
            setWeatherCode(data.weather[0].id);
          })
          .catch(error => {
            console.error("Error fetching weather data:", error);
            Alert.alert("Feil", "Kunne ikke hente værdata.");
        });
      });
    } else {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=3dd481e1ac127e7b76c2dfea2bea1505&units=metric&lang=no`)
        .then(response => response.json())
          .then(data => {
            setCity(data.name);
            setStatus(data.weather[0].description);
            setTemperatur(data.main.temp + " °C");
            setWeatherCode(data.weather[0].id);
          })
          .catch(error => {
            console.error("Error fetching weather data:", error);
            getWeather()
        });
    }
  };

  if (firstTime) {
    getWeather()
    setFirstTime(false);
  }

  switch (weatherCode.toString().charAt(0)) {
    case '2':
      weatherImage = require("./thunderstorm.jpg");
      break;
    case '3':
      weatherImage = require("./drizzle.jpg");
      break;
    case '5':
      weatherImage = require("./rain.jpg");
      break;
    case '6':
      weatherImage = require("./snow.jpg");
      break;
    case '7':
      weatherImage = require("./atmosphere.jpg");
      break;
    case '8':
      weatherImage = require("./clouds.jpg");
      break;
  }
  if (weatherCode === 800) {
    weatherImage = require("./clear.jpg");
  }

  console.log(weatherCode);

  return (
    <View style={styles.container}>
      <ImageBackground
      source={weatherImage}
      style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
      > 
      <Text style={styles.city_text}>{city}</Text>
      <Text style={styles.status_text}>{weatherStatus}</Text>
      <Text style={styles.temperatur}>{temperatur}</Text>
      <TextInput style={styles.input} placeholder="Søk et sted" onSubmitEditing={({ nativeEvent }) => getWeather(nativeEvent.text)}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  city_text: {
    fontSize: 36,
    fontWeight: "bold",
    color: 'white',
  },
  status_text: {
    fontSize: 24,
    fontWeight: "normal",
    color: 'white',
  },
  temperatur: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
  },
  input: {
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "80%",
    backgroundColor: "#f0f0f0",
  },
});