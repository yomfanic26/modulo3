import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon, Input } from '@rneui/base';
import { useState } from 'react';
import{ saveGrade } from '../services/gradeServices'

export const GrameForm = () => {
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const save = () => {
        saveGrade({ subject: subject, grade: grade });
    }

    return (
        <View style={styles.container}>
            <Text>FORMULARIO DE NOTAS</Text>
            <Input
                value={subject}
                onChangeText={setSubject}
                placeholder='Ejemplo: Matematicas'
                label="Materia"
            />
            <Input
                value={grade}
                onChangeText={setGrade}
                placeholder='0-10'
                label="Nota"
            />
            <Button
                title="GUARDAR"
                icon={{
                    name: "save",
                    type: "entypo",
                    color: "white"
                }}
                onPress={save}
                buttonStyle={styles.saveButton}
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
    saveButton: {
        backgroundColor: 'green',
    },
});
