import { View, Text, StyleSheet, Button } from "react-native"

export const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button style={styles.boton}
                title="CONTACTOS"
                onPress={() => {
                    navigation.navigate("ContacNav");
                }}
            />
            <Text style={styles.text}>HOME</Text>
            <Button
                title="PRODUCTOS"
                onPress={() => {
                    navigation.navigate("ProductoNav");
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    text: {
        marginBottom: 50,
        marginHorizontal:20
    },
});
