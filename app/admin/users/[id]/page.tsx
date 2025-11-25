import { getUserByIdAction } from "@/actions/user"
import UserForm from "@/components/forms/UserForm"

type UserEditPageProps = {
  params: {
    id: string
  }
}

const UserEditPage = async ({ params }: UserEditPageProps) => {
  const { id } = await params
  const result = await getUserByIdAction(id)
  const user = result.data

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