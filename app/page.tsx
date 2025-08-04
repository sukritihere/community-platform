"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { CreatePost } from "@/components/posts/create-post";
import { PostFeed } from "@/components/posts/post-feed";
import { ActivityFeed } from "@/components/enhanced/activity-feed";
import { TrendingTopics } from "@/components/enhanced/trending-topics";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Meteors } from "@/components/ui/meteors";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, Users, Bell, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="h-16 border-b bg-background">
          <div className="container flex h-16 items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
        <div className="container max-w-2xl mx-auto py-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
          {[...Array(3)].map((_, i) => (
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
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const dockItems = [
    {
      title: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      onClick: () => {},
    },
    {
      title: "Network",
      icon: <Users className="h-5 w-5" />,
      onClick: () => {},
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      onClick: () => {},
    },
    {
      title: "Search",
      icon: <Search className="h-5 w-5" />,
      onClick: () => {},
    },
    { title: "Create", icon: <Plus className="h-5 w-5" />, onClick: () => {} },
  ];
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <Meteors number={15} className="opacity-20" />

      <Navbar />

      <main className="container mx-auto py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block lg:col-span-3 space-y-6"
          >
            <ActivityFeed />
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-6 space-y-6"
          >
            <CreatePost onPostCreated={handlePostCreated} />
            <PostFeed refreshTrigger={refreshTrigger} />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block lg:col-span-3 space-y-6"
          >
            <TrendingTopics />
          </motion.aside>
        </div>
      </main>

      <div className="lg:hidden">
        <FloatingDock items={dockItems} />
      </div>
    </div>
  );
}
