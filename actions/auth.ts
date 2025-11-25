'use server'
import { cookies } from "next/headers";
import { apiClient } from "./client";

export async function login(prevState: { username: string, password: string }): Promise<{
    success: boolean,
    message: string
}> {
    const { username, password } = prevState
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        cache: "no-store",
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const backendCookie = res.headers.get('set-cookie');
    const sid = /connect\.sid=([^;]+)/.exec(backendCookie!)?.[1];

    if (sid) {
        (await cookies()).set('admin_session', sid, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/'
        });
    }
    return res.json()
}


export async function logout(): Promise<{
    success: boolean,
    message: string
}> {
    const cookieStore = await cookies();
    const res: {
        success: boolean
        message: string
    } = await apiClient("/auth/logout", {
        method: "POST"
    });
    if (res.success) {
        cookieStore.delete("admin_session");
    }
    return res
}