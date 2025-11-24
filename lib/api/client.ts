'use server'
import { auth } from "../auth";

export async function apiClient(path: string, options: RequestInit = {}) { 
    const conectSid = await auth();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Cookie": `connect.sid=${conectSid}`,
            ...options.headers,
        },
        credentials: 'include',
        cache: "no-store",
    });

    return res.json();
}
