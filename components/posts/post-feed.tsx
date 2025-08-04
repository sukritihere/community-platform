"use client";

import { useState, useEffect } from "react";
import { PostCard } from "./post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
    bio: string;
    profilePicture?: string;
  };
  createdAt: string;
}

interface PostFeedProps {
  refreshTrigger?: number;
  userId?: string;
}

export function PostFeed({ refreshTrigger, userId }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = userId
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/user/${userId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setPosts(data.posts || []);
      } else {
        setError(data.message || "Failed to fetch posts");
      }
    } catch (error) {
      console.error("Fetch posts error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger, userId]);

  const handlePostDelete = () => {
    fetchPosts();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            {userId
              ? "No posts yet."
              : "No posts in the feed yet. Be the first to share something!"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={handlePostDelete} />
      ))}
    </div>
  );
}
