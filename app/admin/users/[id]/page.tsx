import { getUsersByIdAction } from "@/actions/users"
import UserForm from "@/components/forms/UserForm"
import { User } from "../columns"

type UserEditPageProps = {
  params: {
    id: string
  }
}

const UserEditPage = async ({ params }: UserEditPageProps) => {
  const { id } = await params
  const user: User = await getUsersByIdAction(id)

  return (
    <section>
      <div className="bg-white p-8">
        <h1 className="text-3xl font-bold mb-8">Update User</h1>
        <UserForm initialValues={user} id={id} />
      </div>
    </section>
  )
}
export default UserEditPage