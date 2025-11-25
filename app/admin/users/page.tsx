import { getUsersAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns, User } from "./columns";
import { DataTable } from "./data-table";

const UserPage = async () => {
  const result = await getUsersAction();
  const data: User[] = result.data

  return (
    <section>
      <div className="mx-auto flex justify-between items-center bg-white px-4 py-8">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Button variant='outline' asChild>
          <Link href='/admin/users/create'>
            <Plus /> Add Users
          </Link>
        </Button>
      </div>

      <div className="p-4">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
export default UserPage