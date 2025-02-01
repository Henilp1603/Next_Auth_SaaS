import { signOut } from "@/auth";

const SettingsPage = () => {
  return (
    <div>
      <form action={async()=>{
        "use server";

        await signOut();
      }}>
        <button type="submit">SignOut</button>
      </form>
    </div>
  )
}

export default SettingsPage