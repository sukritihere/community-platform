"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Users, MessageSquare, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MagicCard } from "@/components/ui/magic-card";

interface ActivityItem {
  id: string;
  type: "post" | "like" | "comment" | "follow";
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  engagement?: number;
}

export function ActivityFeed() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "post",
      user: { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150" },
      content: "Just launched our new design system! Excited to share it with the community.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      engagement: 24,
    },
    {
      id: "2",
      type: "like",
      user: { name: "Mike Chen" },
      content: "liked your post about React best practices",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
    },
    {
      id: "3",
      type: "comment",
      user: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
      content: "commented: 'Great insights! This will definitely help our team.'",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: "4",
      type: "follow",
      user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
      content: "started following you",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]);

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "post":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "follow":
        return <Users className="h-4 w-4 text-purple-500" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  return (
    <MagicCard className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback className="text-xs">
                {activity.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {getIcon(activity.type)}
                <span className="text-sm font-medium">
                  {activity.user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {activity.content}
              </p>
              
              {activity.engagement && (
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <Badge variant="secondary" className="text-xs">
                    {activity.engagement} interactions
                  </Badge>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </MagicCard>
  );
}