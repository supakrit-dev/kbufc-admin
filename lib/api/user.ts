import { apiClient } from "./client";

export async function getUser(): Promise<{
    success: boolean,
    data?: any
    message?: string
}> {
    return apiClient("/admin/users", {
        method: "GET",
    });
}

export async function getUserById(id: string): Promise<{
    success: boolean,
    data?: any
    message?: string
}> {
    return apiClient(`/admin/users/${id}`, {
        method: "GET"
    });
}

export async function createUser(prevState: {
    username: string
    password: string
    role: string
    status: string
}): Promise<{
    success: boolean,
    message: any

}> {
    const { username, password, role, status } = prevState
    return apiClient("/admin/users", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            role: role,
            status: status
        })
    });
}

export async function deleteUser(id: string): Promise<{
    success: boolean,
    message: any

}> {
    return apiClient(`/admin/users/${id}`, {
        method: "DELETE"
    });
}

export async function updateUser(prevState: {
    username: string
    password: string
    role: string
    status: string
}, id: string): Promise<{
    success: boolean,
    message: any

}> {
    const { username, password, role, status } = prevState
    
    
    return apiClient(`/admin/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            username: username,
            password: password,
            role: role,
            status: status
        })
    })
}