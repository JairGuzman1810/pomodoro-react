import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import Header from "./src/components/Header";

const colors = ["#F7D6BF", "#AFEEEE", "#88D8BD"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  console.log(currentTime);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]} //Mediante el colors[currentTime] se va cambiar el color segun el index
    >
      <View style={{ paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Text style={styles.text}>{time}</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
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
});
