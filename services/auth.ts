import instance from "@/helpers/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "./user";

export const login = async (email: string, password: string): Promise<User> => {
  try {
      const response = await instance.post("/auth/login", { username:email, password });
      //save token in local storage or state management
        await setSigned(response.data); // Save the user data to AsyncStorage
    return response.data; 
  } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
      await logout(); // Clear any existing user data on login failure
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getSigned(): Promise<User | null> {
    try {
        const value = await AsyncStorage.getItem("user");
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error("Error getting item from AsyncStorage:", error);
        return null;
    }
}

export async function logout(): Promise<void> {
    try {
        await AsyncStorage.removeItem("user");
    } catch (error) {
            throw new Error({
                message: "User not signed in",
                response:{
                    status: 401
                }
            } as any);
    }
}
export async function setSigned(user: User): Promise<void> {
    try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.error("Error setting item in AsyncStorage:", error);
    }
}

