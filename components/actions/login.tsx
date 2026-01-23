"use server";

import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { setAuthCookie } from "@/app/lib/auth";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.users.findFirst({
    where: { email, password },
  });

  // ❌ Invalid user
  if (!user) {
    redirect("/auth/login?error=invalid");
  }

  // Set auth cookie
  await setAuthCookie({
    userId: user.userid,
    username: user.username,
    email: user.email,
    role: user.role || "user",
  });

  // ✅ Admin
  if (user.role === "admin") {
    redirect("/AdminPanel");
  }
  // ✅ Normal user
  else {
    redirect("/UserPanel");
  }
}
