"use server";

import { cookies } from "next/headers";

export const checkAuth = async () => {
  const token = cookies().get("authToken")?.value;

  if (!token) return null;

  return token;
};
