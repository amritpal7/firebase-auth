"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="flex items-center gap-2">Loading...</h1>
      </div>
    );

  return (
    <main className="flex items-center justify-center px-4 py-2 bg-background relative overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back - {user?.displayName}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={user?.photoURL || ""}
            alt="User Profile"
            width={100}
            height={100}
          />
          <p>{user?.email}</p>
        </CardContent>
      </Card>
    </main>
  );
}
