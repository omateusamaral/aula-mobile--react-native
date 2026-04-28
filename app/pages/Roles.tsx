import {
  createRole,
  deleteRole,
  editRole,
  listRoles,
  Role,
} from "@/services/roles";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateRoleModal from "../components/CreateRoleModal";
import EditRoleModal from "../components/EditRoleModal";

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [openCreateRoleModal, setOpenCreateRoleModal] = useState(false);
  const [openEditRoleModal, setOpenEditRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await listRoles();
      setRoles(response);
    };

    fetchRoles();
  }, []);

  const handleDeleteRole = async (id: number) => {
    Alert.alert("Deletar", "Tem certeza que deseja deletar esta role?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        onPress: async () => {
          await deleteRole(id);
          setRoles(roles.filter((role) => role.id !== id));
        },
        style: "destructive",
      },
    ]);
  };

  const handleEditRole = async (newRole: Role) => {
    if (!selectedRole) return;
    await editRole(selectedRole.id, newRole);
    Alert.alert("Sucesso", "Role editada com sucesso!");
    setOpenEditRoleModal(false);
    setSelectedRole(null);
    const response = await listRoles();
    setRoles(response);
  };

  const handleCreateRole = async (newRole: Omit<Role, "id">) => {
    if (!newRole.name) {
      Alert.alert("Erro", "O nome da role é obrigatório.");
      return;
    }

    if (!newRole.description) {
      Alert.alert("Erro", "A descrição da role é obrigatória.");
      return;
    }
    await createRole(newRole);
    Alert.alert("Sucesso", "Role criada com sucesso!");
    setOpenCreateRoleModal(false);
    const response = await listRoles();
    setRoles(response);
  };

  const handleOpenCreateRoleModal = () => {
    setOpenCreateRoleModal(true);
    setSelectedRole(null);
  };

  const handleOpenEditRoleModal = (role: Role) => {
    setSelectedRole(role);
    setOpenEditRoleModal(true);
  };
  const renderRoleItem = ({ item }: { item: Role }) => (
    <View style={styles.roleItem}>
      <Text style={styles.avatar}>{item.name.charAt(0).toUpperCase()}</Text>
      <View style={styles.roleInfo}>
        <Text style={styles.roleName}>{item.name}</Text>
        <Text style={styles.roleDescription}>{item.description}</Text>
      </View>
      <Button
        title="Deletar"
        color="#FF3B30"
        disabled={item.id === 1}
        onPress={() => handleDeleteRole(item.id)}
      />
      <View style={{ width: 8 }} />
      <Button
        title="Editar"
        color="#007AFF"
        disabled={item.id === 1}
        onPress={() => handleOpenEditRoleModal(item)}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: 200, alignSelf: "center", marginVertical: 12 }}>
        <Button title="Criar Role" onPress={handleOpenCreateRoleModal} />
      </View>
      <CreateRoleModal
        visible={openCreateRoleModal}
        onClose={() => setOpenCreateRoleModal(false)}
        onCreate={handleCreateRole}
      />
      <EditRoleModal
        visible={openEditRoleModal}
        onClose={() => {
          setOpenEditRoleModal(false);
          setSelectedRole(null);
        }}
        onEdit={handleEditRole}
        role={selectedRole}
      />
      {roles.length > 0 ? (
        <FlatList
          data={roles}
          renderItem={renderRoleItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Nenhuma role encontrada</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 500,
  },
  roleItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    height: 200,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  roleDescription: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
    paddingLeft: 3,
  },
  arrow: {
    fontSize: 20,
    color: "#ccc",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
