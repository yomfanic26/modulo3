import { StyleSheet, Text, View } from "react-native";

export const ContenidoB=() => {
    return (<View style={styles.container}>
        <Text> CONTENIDO B</Text>
    </View>)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "stretch",
      justifyContent: "flex-start",
    },
  });