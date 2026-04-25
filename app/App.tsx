import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Roles from "./pages/Roles";
import SignUp from "./pages/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="home"
        component={Home}
        options={({ navigation }) => ({
          title: "Usuários",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("roles" as never);
              }}
              style={{ marginLeft: 16 }}
            >
              <Text
                style={{ fontSize: 16, color: "#007AFF", fontWeight: "300" }}
              >
                Acessar Roles
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signUp" as never);
              }}
              style={{ marginRight: 16 }}
            >
              <Text
                style={{ fontSize: 28, color: "#007AFF", fontWeight: "300" }}
              >
                +
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{
          title: "Página de acesso",
          headerTitleAlign: `center`,
        }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="roles"
        component={Roles}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
