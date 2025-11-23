import { cookies } from "next/headers";

export async function auth() {
    const cookieStore = await cookies()
    return cookieStore.get('connect.sid')
}