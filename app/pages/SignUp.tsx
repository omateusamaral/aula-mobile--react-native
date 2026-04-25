import { logout } from "@/services/auth";
import { createUser } from "@/services/user";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !username || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor preecha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await createUser({
        name,
        password,
        roles: ["user"],
        username,
      });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("home" as never);
    } catch (error: any) {
      Alert.alert("Erro", "Falha ao criar a conta. Tente novamente.");
      console.log(`mateus`, error);
      if (error?.response?.status === 401) {
        await logout();
        navigation.navigate("login" as never);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se a nós hoje!</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            value={name}
            onChangeText={setName}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="seu nome de usuário"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>criar conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  linkText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
