"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role === "admin") {
      router.push("/admin");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>uploading...</p>
    </div>
  );
}
