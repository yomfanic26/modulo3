import { StyleSheet, Text, View } from "react-native";

export const ContenidoA=() => {
    return (<View style={styles.container}>
        <Text> CONTENIDO A</Text>
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