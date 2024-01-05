import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox, Button } from "react-native";
import { GradeForm } from "./app/screens/GradeForm";
import { ListGrades } from "./app/screens/ListGrades";
import { ContenidoA } from "./app/screens/ContenidoA";
import { ContenidoB } from "./app/screens/ContenidoB";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();
const tabs = createBottomTabNavigator();

function PrincipalScreen() {
  return (
    <stack.Navigator>
      <stack.Screen name="Lista De Notas" component={ListGrades} />
      <stack.Screen name="RegistroNotas" component={GradeForm} />
    </stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <drawer.Navigator>
        <drawer.Screen name="Inicio">
          {() => (
            <tabs.Navigator>
            
              <tabs.Screen
                name="LIsta de Notas"
                component={PrincipalScreen}
                options={{
                  title: "LISTADO",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list-circle" size={size} color={color} />
                  ),
                }}
              />
              <tabs.Screen
                name="ContenidoA"
                component={ContenidoA}
                options={{
                  title: "CONTENIDO A",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library-outline" size={size} color="blue" />
                  ),
                }}
              />
              <tabs.Screen
                name="ContenidoB"
                component={ContenidoB}
                options={{
                  title: "CONTENIDOB",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library-sharp" size={size} color="blue" />
                  ),
                }}
              />
            </tabs.Navigator>
          )}
        </drawer.Screen>
        <drawer.Screen name="ContenidoA" component={ContenidoA} />
        <drawer.Screen name="ContenidoB" component={ContenidoB} />
      </drawer.Navigator>
    </NavigationContainer>
  );
}
