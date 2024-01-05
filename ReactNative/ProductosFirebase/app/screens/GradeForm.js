import { View, StyleSheet, LogBox } from "react-native";
import { Input } from "@rneui/base";
import { Icon, Button } from "@rneui/themed";
import { useState } from "react";
import { saveGrade, updateGrade } from "../services/GradeServices";

LogBox.ignoreLogs([
  "Non-serializable values were found inthe navigation state",
]);

export const GradeForm = ({ navigation, route }) => {
  let isNew = true;
  let subjectR;
  let gradeR;

  if (route.params.notita != null) {
    isNew = false;
  }

  if (!isNew) {
    subjectR = route.params.notita.subject;
    gradeR = route.params.notita.grade;
  }

  const [subject, setSubject] = useState(subjectR);
  const [grade, setGrade] = useState(gradeR == null ? null : gradeR + "");
  const [errorSubject, setErrorSubject] = useState();
  const [errorGrade, setErrorGrade] = useState();
  const hasErrors = false;

  //GUARDAR
  const save = () => {
    setErrorGrade(null);
    setErrorSubject(null);
    validate();
    if (!hasErrors) {
      if (isNew) {
        saveGrade({ subject: subject, grade: grade });
      } else {
        updateGrade({ subject: subject, grade: grade });
      }
      navigation.goBack();
      if (route.params && route.params.fnRefresh()) {
        route.params.fnRefresh();
      }
    }
  };

  //Validar campos
  const validate = () => {
    if (subject == null || subject == "") {
      setErrorSubject("INGRESE MATERIA");
      hasErrors = true;
    }
    let gradeFloat = parseFloat(grade);
    if (
      gradeFloat == null ||
      isNaN(gradeFloat) ||
      gradeFloat < 0 ||
      gradeFloat > 10
    ) {
      setErrorGrade("INGRESE NOTA ENTRE 0 - 10");
      hasErrors = true;
    }
  };

  return (
    <View style={styles.container}>
      {/*INGRESEO DE DATOS*/}
      <Input
        value={subject}
        onChangeText={setSubject}
        placeholder="Ejemplo: Matematicas"
        label="MATERIA"
        errorMessage={errorSubject}
        disabled={!isNew}
      />
      <Input
        value={grade}
        onChangeText={setGrade}
        keyboardType="numeric"
        placeholder="0-10"
        label="NOTA"
        errorMessage={errorGrade}
      />

      <Button
        /*title="GUARDAR"*/ type="solid"
        onPress={save}
        buttonStyle={styles.saveButton}
      >
        <Icon name="save" color="white" type="entypo" />
        GUARDAR
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "green",
  },
});
