"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { ProfileHeader } from "@/components/profile/profile-header";
import { PostFeed } from "@/components/posts/post-feed";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture?: string;
  joinedAt: string;
}

export default function ProfileClient({ userId }: { userId: string }) {
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [postCount, setPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const userResponse = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        const userData = await userResponse.json();

        if (userResponse.ok) {
          setProfileUser(userData.user);
        } else {
          setError(userData.message || "User not found");
          return;
        }

        const postsResponse = await fetch(
          `http://localhost:5000/api/posts/user/${userId}`
        );
        const postsData = await postsResponse.json();

        if (postsResponse.ok) {
          setPostCount(postsData.pagination?.totalPosts || 0);
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  const isOwnProfile = currentUser?.id === userId;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-4xl mx-auto py-8 space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-4xl mx-auto py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
              <p className="text-muted-foreground">
                {error || "The requested user profile could not be found."}
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container max-w-4xl mx-auto py-8 space-y-8">
        <ProfileHeader
          user={profileUser}
          isOwnProfile={isOwnProfile}
          postCount={postCount}
        />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            {isOwnProfile ? "Your Posts" : `${profileUser.name}'s Posts`}
          </h2>
          <PostFeed userId={userId} />
        </div>
      </main>
    </div>
  );
}
