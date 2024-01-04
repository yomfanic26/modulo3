import { StyleSheet, Text, View, Alert, FlatList, TouchableHighlight } from 'react-native';
import { getGrades } from '../services/gradeServices';
import { Button, Icon, Input, FAB, ListItem, Avatar } from '@rneui/base';
import { useState } from 'react';

export const ListaGrades = ({ navigation }) => {

    const [time, setTime] = useState();

    //metro para refresacar
    const refreshList = () => {
        setTime(new Date().getTime())
    }
    const ItemGrade = ({ nota }) => {
        return (
            <TouchableHighlight onPress={() => {
                //me voy a la pagina qu enavego y le paso el objeto
                navigation.navigate("GradeFormNav", { notita: nota, fnRefresh:refreshList})
            }}>
                <ListItem bottomDivider>
                    <Avatar
                        title={nota.subject.substring(0, 1)}
                        containerStyle={{ backgroundColor: '#eb1561' }}
                        rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title>{nota.subject}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>{nota.grade}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableHighlight>
        );
    };

    return (
        <View style={styles.container}>
            <Text>LISTA DE NOTAS</Text>
            <FlatList
                data={getGrades()}
                renderItem={({ item }) => {
                    return <ItemGrade nota={item} />
                }}
                keyExtractor={(item) => { return item.subject }}
                //para atar una varible de estaod para que se repinte
                extraData={time}
            />
            <FAB
                title="+"
                placement='right'
                onPress={() => {
                    navigation.navigate("GradeFormNav", { notita: null,fnRefresh:refreshList})

                }} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "stretch"
    },
});
