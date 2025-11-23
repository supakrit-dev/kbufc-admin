import { apiClient } from "./client";

export async function login(prevState: { username: string, password: string }): Promise<{
    success: boolean,
    message: string
}> {
    const {username, password} = prevState
    return apiClient("/auth/login",
        {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
    );
}