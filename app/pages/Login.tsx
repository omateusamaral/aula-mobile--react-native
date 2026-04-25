import { useAuth } from "@/contexts/auth-context";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    minWidth: 300,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }

      setIsLoading(true);
      await login(email, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      // A navegação é automática via contexto
    } catch (error) {
      Alert.alert(
        "Erro",
        "Falha no login. Verifique suas credenciais e tente novamente.",
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
