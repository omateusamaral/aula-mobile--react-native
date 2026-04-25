import instance from "@/helpers/axios";
import { Alert } from "react-native";
import { getSigned, logout } from "./auth";

export interface Role {
    id: number;
    name: string;
    description: string;
}
export async function listRoles(): Promise<Role[]>{
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        const response = await instance.get("/roles", {
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

export async function deleteRole(id: number): Promise<void> {
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        await instance.delete(`/roles/${id}`, {
            headers: {
                'Authorization': `Bearer ${signed.token}`,
            }
        });
    } catch (error:any) {
       Alert.alert("Error", error.response.data.message);
        throw error;
    }
}

export async function createRole(role: Omit<Role, "id">): Promise<Role> { 
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        const response = await instance.post("/roles", role, {
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

export async function editRole(id: number, role: Omit<Role, "id">): Promise<Role> {
    try {
        const signed = await getSigned();
        if (!signed) {
            await logout();
            throw new Error("User not signed in");
        }
        const response = await instance.put(`/roles/${id}`, role, {
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