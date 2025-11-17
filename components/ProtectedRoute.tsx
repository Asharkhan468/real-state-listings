"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: any }) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!token) {
      router.replace("/admin");
    }
  }, []);

  return children;
}
