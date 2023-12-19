import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];
export default function Header({
  currentTime,
  setCurrentTime,
  setTime,
  setIsActive,
}) {
  function handlePress(index) {
    //Asi se asigna a una variable const un valor
    //como es inmutable, entonces se debe realizar de esa forma
    //:15 es como el else, si no es 0 o 1 entonces sera 2, entonces 15
    setIsActive(false);
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;

    setCurrentTime(index);
    setTime(newTime * 60);
  }
  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            style.itemStyle,
            currentTime !== index && { borderColor: "transparent" }, //Asi se pone un estilo mediante una validación
            // && significa el resultado
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  itemStyle: {
    borderWidth: 3,
    padding: 5,
    width: "33%",
    borderColor: "white",
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
