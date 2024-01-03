import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GrameForm } from './app/screens/GradeForms'
import { ListaGrades } from'./app/screens/ListaGrades'


const stackGrades = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stackGrades.Navigator>
      <stackGrades.Screen name='GradeFormNav' component={GrameForm} />
        <stackGrades.Screen name='GradeListaNav' component={ListaGrades} />

      </stackGrades.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
