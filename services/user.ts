import instance from "@/helpers/axios";
import { Alert } from "react-native";
import { getSigned, logout } from "./auth";

export interface User { 
    id:number;
    name: string;
    username: string;
    roles: string[];
    password: string;
    token: string;

}export async function listUsers(): Promise<User[]> {
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        const response = await instance.get("/users", {
            headers: {
                'Authorization': `Bearer ${signed.token}`,
            }
        });
        return response.data;
    } catch (error:any) {
      Alert.alert("Error", error.response.data.message);
        throw error;
    }
}

export async function createUser(user: Omit<User, "token" | "id">): Promise<User> {
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        const response = await instance.post("/users", user, {
            headers: {
                'Authorization': `Bearer ${signed.token}`,
            }
        });
        return response.data;
    } catch (error:any) {
        Alert.alert("Error", error.response.data.message);
        throw error;
    }
}

export async function deleteUser(userId: number): Promise<void> {
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        await instance.delete(`/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${signed.token}`,
            }
        });
    } catch (error:any) {
        Alert.alert("Error", error.response.data.message);
        throw error;
    }
}

export async function editUser(userId: number, user: Omit<User, "token">): Promise<User> {
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        
        const response = await instance.put(`/users/${userId}`, {
            name: user.name,
            username: user.username,
            password: user.password,
            roles: user.roles,
        }, {
            headers: {
                'Authorization': `Bearer ${signed.token}`,
            }
        });
        return response.data;
    } catch (error:any) {
        Alert.alert("Error", error.response.data.message);
        throw error;
    }
}