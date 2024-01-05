import { View, StyleSheet, FlatList, TouchableHighlight, LogBox } from "react-native";
import { getGrades } from "../services/GradeServices";
import { Avatar, FAB, ListItem } from "@rneui/base";
import { useState } from "react";

LogBox.ignoreLogs([
  "Non-serializable values were found inthe navigation state",
]);

export const ListGrades = ({ navigation }) => {
  const [time, setTime] = useState(); //actualizar

  const refreshList = () => {
    //Refrescar la lista
    setTime(new Date().getTime());
  };

  const ItemGrade = ({ nota }) => {
    //Listar materias en botones
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("REGISTRO", {
            notita: nota,
            fnRefresh: refreshList,
          });
        }}
      >
        <ListItem bottomDivider>
          <Avatar
            title={nota.subject.substring(0, 1)}
            containerStyle={{ backgroundColor: "#6733b9" }}
            rounded
          />
          <ListItem.Content>
            <ListItem.Title>{nota.subject}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Subtitle>{nota.grade}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getGrades()}
        renderItem={({ item }) => {
          return <ItemGrade nota={item} />;
        }}
        keyExtractor={(item) => {
          return item.subject;
        }}
        extraData={time}
      />
      <FAB
        title="+"
        placement="right"
        onPress={() => {
          navigation.navigate("REGISTRO", {
            notita: null,
            fnRefresh: refreshList,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
