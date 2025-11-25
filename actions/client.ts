'use server'

import { cookies } from "next/headers";

export async function apiClient(path: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const sid = cookieStore.get("admin_session")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api${path}`, {
        ...options,
        headers: {
            "Cookie": sid ? `connect.sid=${sid}` : "",
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: "include",
        cache: "no-store",
    });
    return res.json();
}
