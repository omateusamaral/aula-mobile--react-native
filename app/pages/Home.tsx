import { listRoles, Role } from "@/services/roles";
import { deleteUser, editUser, listUsers, User } from "@/services/user";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditUserModal from "../../components/EditUserModal";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [roles, setRoles] = React.useState<Role[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteUser = (id: number) => {
    Alert.alert("Deletar", "Tem certeza que deseja deletar este usuário?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        onPress: async () => {
          await deleteUser(id);
          setUsers(users.filter((user) => user.id !== id));
        },
        style: "destructive",
      },
    ]);
  };
  const handleOpenModalEditUser = async (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleEditUser = async (newUser: User) => {
    if (!selectedUser) return;
    await editUser(selectedUser.id, newUser);
    Alert.alert("Sucesso", "Usuário editado com sucesso!");
    setOpenEditModal(false);
    setSelectedUser(null);
    const response = await listUsers();
    setUsers(response);
  };
  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        const response = await listUsers();
        setUsers(response);
      };

      const fetchRoles = async () => {
        const response = await listRoles();
        setRoles(response);
      };

      fetchUsers();
      fetchRoles();
    }, []),
  );

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.avatar}>{item.username.charAt(0).toUpperCase()}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.username}</Text>
        <Text style={styles.userRoles}>
          Role: {item?.roles?.map((role) => role).join(", ") ?? "Nenhuma"}
        </Text>
      </View>
      <Button
        title="Deletar"
        color="#FF3B30"
        disabled={item.id === 1}
        onPress={() => handleDeleteUser(item.id)}
      />
      <View style={{ width: 8 }} />
      <Button
        title="Editar"
        disabled={item.id === 1}
        onPress={() => handleOpenModalEditUser(item)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <EditUserModal
        visible={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onEdit={(newUser) => handleEditUser(newUser)}
        user={selectedUser}
        roles={roles}
      />
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Nenhum usuário encontrado</Text>
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
  userRoles: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  userItem: {
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
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
