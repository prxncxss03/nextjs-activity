import { signup } from "./action"

export default function LoginPage() {
  return (
    <form>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}