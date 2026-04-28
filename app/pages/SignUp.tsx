import { logout } from "@/services/auth";
import { listRoles, Role } from "@/services/roles";
import { createUser, User } from "@/services/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function SignUp() {
  const navigation = useNavigation();
  const [user, setUser] = useState<Omit<User, "id" | "token" | "roles">>({
    name: "",
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesSelected, setRolesSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSignUp = async () => {
    if (!user.name || !user.username || !user.password || !confirmPassword) {
      Alert.alert("Erro", "Por favor preecha todos os campos");
      return;
    }

    if (user.password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem");
      return;
    }

    if (user.password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await createUser({
        name: user.name,
        password: user.password,
        roles: rolesSelected,
        username: user.username,
      });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      setUser({
        name: "",
        username: "",
        password: "",
      });
      setConfirmPassword("");
      setRolesSelected([]);
      navigation.navigate("home" as never);
    } catch (error: any) {
      Alert.alert("Erro", "Falha ao criar a conta. Tente novamente.");
      if (error?.response?.status === 401) {
        await logout();
        navigation.navigate("login" as never);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchRoles = async () => {
        const response = await listRoles();
        setRoles(response);
      };

      fetchRoles();
    }, []),
  );

  const dropdownItems = useMemo(
    () =>
      roles && Array.isArray(roles)
        ? roles.map((role) => ({
            label: role.name,
            value: role.name,
          }))
        : [],
    [roles],
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Criar Conta</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="seu nome de usuário"
            value={user.username}
            onChangeText={(text) => setUser({ ...user, username: text })}
            keyboardType="default"
            editable={!loading}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
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
          <View
            style={{
              marginVertical: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              width: "100%",
              zIndex: 1000,
            }}
          >
            <DropDownPicker
              multiple={true}
              min={0}
              max={5}
              open={open}
              value={rolesSelected}
              items={dropdownItems}
              setOpen={setOpen}
              setValue={setRolesSelected}
              setItems={() => {}}
              mode="BADGE"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
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
