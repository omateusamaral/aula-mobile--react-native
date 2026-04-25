import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Roles from "./pages/Roles";
import SignUp from "./pages/SignUp";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={isSignedIn ? "home" : "login"}>
      {isSignedIn ? (
        // Rotas protegidas (apenas para usuários logados)
        <>
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
                    style={{
                      fontSize: 16,
                      color: "#007AFF",
                      fontWeight: "300",
                    }}
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
                    style={{
                      fontSize: 28,
                      color: "#007AFF",
                      fontWeight: "300",
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              ),
            })}
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
        </>
      ) : (
        // Rotas públicas (apenas para usuários não logados)
        <>
          <Stack.Screen
            name="login"
            component={LoginPage}
            options={{
              title: "Página de acesso",
              headerTitleAlign: "center",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
