"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteUser(UserID: number) {
  await prisma.users.delete({ where: { userid: UserID } });
  revalidatePath("/AdminPanel/users");
  redirect("/AdminPanel/users");
}