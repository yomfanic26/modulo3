import { View, Text, StyleSheet, Button } from "react-native"

export const Contac = ({navigation}) => {
    return(
    <View style={styles.container}>
        <Text>ESTOY EN EL CONTAC</Text>
        <Button
            title="IR A HOME"
            onPress={()=>{
                navigation.navigate("HomeNav");
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
        alignItems: "center"
    },
});
