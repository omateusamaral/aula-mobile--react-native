import { Role } from "@/services/roles";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateRoleModal({
  visible,
  onClose,
  onCreate,
}: {
  visible: boolean;
  onClose: () => void;
  onCreate: (newRole: Omit<Role, "id">) => Promise<void>;
}) {
  const [createdRole, setCreatedRole] = React.useState<Omit<Role, "id">>({
    description: "",
    name: "",
  });
  if (!visible) return null;
  function handleCreateRole() {
    onCreate(createdRole);
    setCreatedRole({ description: "", name: "" });
  }
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Criar Função</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={createdRole?.name || ""}
          onChangeText={(text) =>
            setCreatedRole({ ...createdRole, name: text })
          }
        />
        <TextInput
          style={styles.inputMultiline}
          placeholder="Descrição"
          value={createdRole?.description || ""}
          multiline={true}
          onChangeText={(text) =>
            setCreatedRole({ ...createdRole, description: text })
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button title="Salvar" onPress={handleCreateRole} />
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
  inputMultiline: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    height: 100,
  },
});
