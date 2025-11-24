import UserForm from "@/components/forms/UserForm"

const UserCreatePage = () => {
    return (
        <section>
            <div className="bg-white p-8">
                <h1 className="text-3xl font-bold mb-8">Add User</h1>
                <UserForm />
            </div>
        </section>
    )
}
export default UserCreatePage