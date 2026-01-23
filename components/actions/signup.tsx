"use server";

import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "user";
  const is_active = formData.get("is_active") === "on";

  await prisma.users.create({
    data: {
      username,
      email,
      password,
      role,
      is_active,
    },
  });

  redirect("/auth/login");
}

