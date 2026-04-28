import { Role } from "@/services/roles";
import { User } from "@/services/user";
import React, { useEffect, useMemo } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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
  const [rolesSelected, setRolesSelected] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

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
  useEffect(() => {
    setEditedUser(user);
    setRolesSelected(user?.roles || []);
  }, [user]);

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            title="Salvar"
            disabled={!editedUser || !rolesSelected.length}
            onPress={() =>
              onEdit({
                ...editedUser,
                roles: rolesSelected,
              })
            }
          />
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
