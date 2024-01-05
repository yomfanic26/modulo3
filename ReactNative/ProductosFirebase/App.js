import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox, Button } from "react-native";
import { GradeForm } from "./app/screens/GradeForm";
import { ListGrades } from "./app/screens/ListGrades";
import { ContenidoA } from "./app/screens/ContenidaA";
import { ContenidoB } from "./app/screens/ContenidoB";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();
const tabs = createBottomTabNavigator();

function PrincipalScreen() {
  return (
    <stack.Navigator>
      <stack.Screen name="NOTAS" component={ListGrades} />
      <stack.Screen name="REGISTRO" component={GradeForm} />
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
                    <Ionicons name="globe" size={size} color={color} />
                  ),
                }}
              />
              <tabs.Screen
                name="Contenido A"
                component={ContenidoA}
                options={{
                  title: "CONTENIDO A",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library" size={size} color={color} />
                  ),
                }}
              />
              <tabs.Screen
                name="Contenido B"
                component={ContenidoB}
                options={{
                  title: "CONTENIDO B",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="logo-bitcoin" size={size} color={color} />
                  ),
                }}
              />
            </tabs.Navigator>
          )}
        </drawer.Screen>
        <drawer.Screen name="Contenido A" component={ContenidoA} />
        <drawer.Screen name="Contenido B" component={ContenidoB} />
      </drawer.Navigator>
    </NavigationContainer>
  );
}