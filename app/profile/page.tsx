"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserProfile from "../hooks/useUserProfile";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

export default function UserProfile() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const {
    userProfile,
    isLoading: profileLoading,
    error,
  } = useUserProfile(user);

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [authLoading, user, router]);

  return (
    <main className="flex items-center justify-center px-4 py-6 bg-background">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card className="mt-20 shadow-2xl rounded-2xl border border-muted/40 transition-all duration-300">
          <CardHeader className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {profileLoading ? (
                <Skeleton className="w-16 h-16 rounded-full" />
              ) : (
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/user-avatar.jpg" alt="User Avatar" />
                  <AvatarFallback className="text-lg font-medium">
                    {user?.displayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}

              <div>
                {profileLoading ? (
                  <>
                    <Skeleton className="h-5 w-40 mb-2 rounded-md" />
                    <Skeleton className="h-4 w-28 rounded-md" />
                  </>
                ) : (
                  <>
                    <CardTitle className="text-2xl font-semibold text-foreground">
                      {userProfile?.fullName || "User Name"}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {userProfile?.email || user?.email}
                    </p>
                  </>
                )}
              </div>
            </div>
            <Button
              className="flex items-center gap-2 text-sm hover:opacity-80 transition"
              variant="ghost"
              onClick={handleLogout}
            >
              <LogOut className="size-5" />
              <AnimatedShinyText className="inline-flex items-center justify-center text-base">
                Logout
              </AnimatedShinyText>
            </Button>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-6 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profileLoading ? (
                <>
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full col-span-1" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full col-span-1" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full col-span-1" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full col-span-1" />
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      defaultValue={userProfile?.fullName || ""}
                      className="focus-visible:ring-ring focus-visible:ring-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      defaultValue={userProfile?.email || ""}
                      className="focus-visible:ring-ring focus-visible:ring-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      defaultValue={userProfile?.username || ""}
                      className="focus-visible:ring-ring focus-visible:ring-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      defaultValue={userProfile?.location || ""}
                      className="focus-visible:ring-ring focus-visible:ring-2"
                    />
                  </div>
                </>
              )}
            </div>

            {!profileLoading && (
              <div className="flex justify-end pt-4">
                <Button className="rounded-xl px-6 hover:scale-105 transition-all duration-200">
                  Update Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
