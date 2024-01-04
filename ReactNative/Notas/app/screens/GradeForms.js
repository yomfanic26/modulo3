import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon, Input } from '@rneui/base';
import { useState } from 'react';
import { saveGrade, updateGrade } from '../services/gradeServices';


export const GrameForm = ({ navigation, route }) => {

    let isNew = true;
    let subjectR;
    let gradeR;
    if (route.params.notita != null) {
        isNew = false;
    }

    if (!isNew) {
        subjectR = route.params.notita.subject
        gradeR = route.params.notita.grade
    }

    const [subject, setSubject] = useState(subjectR);
    const [grade, setGrade] = useState(gradeR == null ? null : gradeR + "");
    const [errorSubject, setErrorSubject] = useState();
    const [errorGrade, setErrorGrade] = useState();
    let hasErrosr = false;

    //recueperar el objeto
    console.log(route.params.notita);


    //funcion para guardar
    const save = () => {
        setErrorGrade();
        setErrorSubject();
        validate();
        if (!hasErrosr) {
            if (isNew) {
                saveGrade({ subject: subject, grade: grade });
            } else {
                updateGrade({ subject: subject, grade: grade });
            }
            navigation.goBack();
            route.params.fnRefresh();
        }
    }

    //metodo para validar las cajss de texto
    const validate = () => {
        if (subject == null) {
            setErrorSubject("Debe ingresar una materia");
            hasErrosr = true;
        }
        let gradeFloat = parseFloat(grade)
        if (gradeFloat == null || isNaN(gradeFloat) || (gradeFloat < 0 || gradeFloat > 10)) {
            setErrorGrade("Debe ingresar una notra entre 0 y 10");
            hasErrosr = true;
        }
    }

    return (
        <View style={styles.container}>
            <Text>FORMULARIO DE NOTAS</Text>
            <Input
                value={subject}
                onChangeText={setSubject}
                placeholder='Ejemplo: Matematicas'
                label="Materia"
                errorMessage={errorSubject}
                disabled={!isNew}
            />
            <Input
                value={grade}
                onChangeText={setGrade}
                placeholder='0-10'
                label="Nota"
                errorMessage={errorGrade}

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
