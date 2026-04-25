import { Role } from "@/services/roles";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export function EditRoleModal({
  visible,
  onClose,
  onEdit,
  role,
}: {
  visible: boolean;
  onClose: () => void;
  onEdit: (newUser: Role) => Promise<void>;
  role: Role | null;
}) {
  const [editedUser, setEditedUser] = React.useState<Role | null>(role);

  useEffect(() => {
    setEditedUser(role);
  }, [role]);
  if (!visible || !role || !editedUser) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Criar Função</Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={editedUser?.description || ""}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, description: text })
          }
        />

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
