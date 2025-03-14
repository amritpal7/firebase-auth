import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types";
import { db } from "@/lib/firebase/firebase";
import { toast } from "sonner";

export default function useUserProfile(user: User | null) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        // Get the user profile from the database
        const docRef = doc(db, "users", user?.uid);
        // Get the snapshot of the user profile
        const snapshot = await getDoc(docRef);
        // If the user profile exists, set the user profile
        if (snapshot.exists()) {
          const data = snapshot.data() as UserProfile;
          setUserProfile(data);
          //   console.log(data);
        }
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        toast.error("Failed to fetch user profile");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the user profile
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { userProfile, isLoading, error };
}
