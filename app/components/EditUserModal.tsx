import { Role } from "@/services/roles";
import { User } from "@/services/user";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
export default function EditUserModal({
  visible,
  onClose,
  onEdit,
  user,
  roles,
}: {
  visible: boolean;
  onClose: () => void;
  onEdit: (newUser: User) => Promise<void>;
  user: User | null;
  roles: Role[];
}) {
  const [editedUser, setEditedUser] = React.useState<User | null>(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  useEffect(() => {}, []);
  if (!visible || !user || !editedUser) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Editar Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={editedUser?.name || ""}
          onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={editedUser?.username || ""}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, username: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={editedUser?.password || ""}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, password: text })
          }
        />
        <View
          style={{
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            width: "100%",
          }}
        >
          <Picker
            selectedValue={editedUser?.roles[0] || ""}
            onValueChange={(itemValue) =>
              setEditedUser({ ...editedUser, roles: [itemValue] })
            }
            style={{
              width: "100%",
            }}
          >
            <Picker.Item label="Selecione uma função" value="" />
            {roles.map((role) => (
              <Picker.Item key={role.id} label={role.name} value={role.name} />
            ))}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button title="Salvar" onPress={() => onEdit(editedUser)} />
          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});
