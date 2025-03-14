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
import { ShineBorder } from "@/components/magicui/shine-border";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { auth, db } from "@/lib/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to the home page if the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let userIdentity = identifier;
      // Check if the identifier is an email or a username
      if (!identifier.includes("@")) {
        const usernameDoc = await getDoc(doc(db, "usernames", identifier));
        if (usernameDoc.exists()) {
          userIdentity = usernameDoc.data().email;
        } else {
          throw new Error("Username does'not exists!");
        }
      }

      console.log("User identity: ", userIdentity);

      // Sign in with the user identity and password
      const res = await signInWithEmailAndPassword(
        auth,
        userIdentity,
        password
      );
      // Get the token
      const token = await res.user.getIdToken();

      // Set the cookie
      document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;

      console.log("Response: ", res);
      console.log("Token id: ", token);
      toast.success("Logged in successfully");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="flex items-center gap-2">
          Loading...
          <Loader2 className="animate-spin" />
        </h1>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <Card className="relative overflow-hidden w-full max-w-md">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4 space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="identifier">Email</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email or username"
                  onChange={e => setIdentifier(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-destructive-foreground">{error}</p>}
            </div>
            <CardFooter className="flex justify-between pt-6">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">No account? </p>
                <Link
                  className="text-sm text-muted-foreground underline"
                  href="/register"
                >
                  Register here!
                </Link>
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
