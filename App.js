import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

const colors = ["#F7D6BF", "#AFEEEE", "#88D8BD"];

export default function App() {
  //Hooks para manipular la información
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  //Nos ayuda acceder a los ciclos de vida de un elemento
  useEffect(() => {
    let interval = null;

    if (isActive) {
      // Si el temporizador está activo, inicia un intervalo que se ejecuta cada segundo
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Reduce el tiempo en 1 segundo
      }, 1000);
    } else {
      // Si el temporizador está inactivo, limpia el intervalo para detener la cuenta regresiva
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      const newTime = currentTime === 0 ? 25 : currentTime === 1 ? 5 : 15;
      setTime(newTime * 60);
    }

    // Limpia el intervalo cuando el componente se desmonta o cuando cambian isActive o time
    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    setIsActive(!isActive);
    playSound(); // Reproduce un sonido (debe estar definido en algún lugar)
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]} //Mediante el colors[currentTime] se va cambiar el color segun el index
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
          flex: 1,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          setIsActive={setIsActive}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
