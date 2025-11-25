export async function apiClient(path: string, options: RequestInit = {}) { 
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: 'include',
        cache: "no-store",
    });

    return res.json();
}
