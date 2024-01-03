import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon, Input } from '@rneui/base';
import { useState } from 'react';

export const ListaGrades = () => {
    return (
        <View style={styles.container}>
            <Text>LISTA DE NOTAS</Text>
            <Button
                title="IR A HOME"
                onPress={() => {
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
