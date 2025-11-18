import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  console.log("token ==>" , token);

  if (!token) {
    redirect("/admin");
  }

  return <>{children}</>;
}
