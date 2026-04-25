import instance from "@/helpers/axios";
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
    } catch (error) {
        console.error("Error fetching roles:", error);
        await logout();
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
    } catch (error) {
        console.error("Error deleting role:", error);
        await logout();
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
    } catch (error) {
        console.error("Error creating role:", error);
        await logout();
        throw error;
    }
}

export async function editUser(id: number, role: Omit<Role, "id">): Promise<Role> {
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
    } catch (error) {
        console.error("Error editing role:", error);
        await logout();
        throw error;
    }
}