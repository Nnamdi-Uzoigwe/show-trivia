import { cookies } from "next/headers";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token");

  return token?.value === process.env.ADMIN_PASSWORD;
}