import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kasem Bundit University FC Official | Log in",
    description: "Login to access admin dashboard",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <main>
            <section>
                {children}
            </section>
        </main>
    );
}
