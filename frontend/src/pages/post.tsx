import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Post() {
  const create = {
    title: "Create Post",
    input: "Create Post",
  }

  const user = {
    name: "username",
    date: "01-20-2025",
    time: "18:54",
    post: "test",
    photo: "",
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{create.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder={create.input} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>{user.name}</h1>
            <p>{user.date}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <h1>{user.post}</h1>
            <img src={user.photo} alt="user_post" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}