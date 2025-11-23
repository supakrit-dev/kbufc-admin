import LoginForm from "@/components/forms/LoginForm"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Image from "next/image"

const LoginPage = () => {
    return (
        <Card className="w-full max-w-md mx-auto mt-40">
            <CardHeader className="text-center">
                <CardTitle className="w-16 h-18 relative mx-auto my-5">
                    <Image src={'/images/kbufc_logo.png'} alt="Kbufc logo picture" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </CardTitle>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your username and password below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm /> 
            </CardContent>
        </Card>
    )
}
export default LoginPage