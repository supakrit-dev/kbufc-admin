'use server'
import { apiClient } from "@/actions/client";
import { revalidatePath } from "next/cache";

export async function getUsersAction() {
    return apiClient("/admin/users", {
        method: "GET",
    });
}

export async function getUserByIdAction(id: string) {
    return apiClient(`/admin/users/${id}`, {
        method: "GET"
    });
}

export async function createUserAction(prevState: {
    username: string
    password: string
    role: string
    status: string
}) {
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

export async function deleteUserAction({ id, pathName }: { id: string, pathName: string }) {
    revalidatePath(pathName)
    return apiClient(`/admin/users/${id}`, {
        method: "DELETE"
    });
}

export async function updateUserAction(prevState: {
    username: string
    password: string
    role: string
    status: string
}, id: string) {
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