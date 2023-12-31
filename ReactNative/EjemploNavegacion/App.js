import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './app/screens/HomeScreen';
import { Contac } from './app/screens/ContacsScreen';
import { Producto } from './app/screens/ProductoScreen';


const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
      <stack.Screen name='HomeNav' component={Home} />
        <stack.Screen name='ContacNav' component={Contac} />
        <stack.Screen name='ProductoNav'component={Producto} />

      </stack.Navigator>
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
