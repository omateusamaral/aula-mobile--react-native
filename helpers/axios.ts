import axios from 'axios';

const instance = axios.create({
baseURL: 'https://affiliate-cursive-disprove.ngrok-free.dev',// Replace with your API base URL
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Variável para armazenar o callback de logout
let onUnauthorizedCallback: (() => void) | null = null;

export function setOnUnauthorizedCallback(callback: () => void) {
  onUnauthorizedCallback = callback;
}

// Interceptor para erros 401 (Unauthorized)
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status !== 200) {
            // Importar aqui para evitar circular dependency
            const { logout } = await import('@/services/auth');
            await logout();
            
            // Chamar callback de redirecionamento se estiver definido
            if (onUnauthorizedCallback) {
                onUnauthorizedCallback();
            }
        }
        return Promise.reject(error);
    }
);

export default instance;