'use server'
import { createUser, deleteUser, getUser, getUserById, updateUser } from "@/lib/api/user";
import { revalidatePath } from "next/cache";

export async function getUsersAction() {
    try {
        const res = await getUser();
        if (!res.success) {
            return { success: false, message: res.message }
        }
        return res.data
    } catch (error) {
        return { success: false, message: error }
    }
}

export async function getUsersByIdAction(id: string) {
    try {
        const res = await getUserById(id)
        if (!res.success) {
            return { success: false, message: res.message }
        }
        return res.data
    } catch (error) {
        return { success: false, message: error }
    }
}

export async function createUsersAction(prevState: {
    username: string
    password: string
    role: string
    status: string
}) {
    try {
        const res = await createUser(prevState)
        if (!res.success) {
            return { success: false, message: res.message }
        }
        return res
    } catch (error) {
        return { success: false, message: error }
    }
}

export async function deleteUsersAction({ id, pathName }: { id: string, pathName: string }) {
    try {
        const res = await deleteUser(id)
        if (!res.success) {
            return { success: false, message: res.message }
        }
        revalidatePath(pathName)
        return { success: true, message: res.message }
    } catch (error) {
        return { success: false, message: String(error) }
    }
}

export async function updateUserAction(prevState: {
    username: string
    password: string
    role: string
    status: string
}, id: string) {
    try {
        const res = await updateUser(prevState, id)
        if (!res.success) {
            return { success: false, message: res.message }
        }
        return { success: true, message: res.message }
    } catch (error) {
        return { success: false, message: String(error) }
    }
}