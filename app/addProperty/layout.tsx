import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectedLayout({ children }:any) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/admin");
  }

  return <>{children}</>;
}
