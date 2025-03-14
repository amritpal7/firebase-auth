"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { toast } from "sonner";
import { setDoc, serverTimestamp } from "firebase/firestore";
import { doc } from "firebase/firestore";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setSubmitting(true);

    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const token = await res.user.getIdToken();
      // Set the cookie
      document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;

      // Set the user profile in the database
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        createdAt: serverTimestamp(),
      });

      // Set the username in the database
      await setDoc(doc(db, "usernames", formData.username), {
        email: formData.email,
      });

      toast.success("Account created successfully");
      router.push("/");
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="relative overflow-hidden w-full max-w-md">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your credentials to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">First Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john-doe@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-destructive-foreground">{error}</p>}
            </div>
            <CardFooter className="flex items-center justify-end pt-6">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
