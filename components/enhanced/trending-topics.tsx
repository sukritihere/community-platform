"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Hash, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";

interface TrendingTopic {
  id: string;
  hashtag: string;
  posts: number;
  growth: number;
  category: string;
}

export function TrendingTopics() {
  const [topics] = useState<TrendingTopic[]>([
    {
      id: "1",
      hashtag: "webdevelopment",
      posts: 1247,
      growth: 23,
      category: "Technology",
    },
    {
      id: "2",
      hashtag: "react",
      posts: 892,
      growth: 18,
      category: "Programming",
    },
    {
      id: "3",
      hashtag: "design",
      posts: 756,
      growth: 15,
      category: "Creative",
    },
    {
      id: "4",
      hashtag: "startup",
      posts: 634,
      growth: 31,
      category: "Business",
    },
    {
      id: "5",
      hashtag: "ai",
      posts: 523,
      growth: 45,
      category: "Technology",
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology":
        return "bg-blue-500/10 text-blue-500";
      case "Programming":
        return "bg-green-500/10 text-green-500";
      case "Creative":
        return "bg-purple-500/10 text-purple-500";
      case "Business":
        return "bg-orange-500/10 text-orange-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <MagicCard className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto hover:bg-muted/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Hash className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">#{topic.hashtag}</p>
                    <p className="text-xs text-muted-foreground">
                      {topic.posts.toLocaleString()} posts
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={getCategoryColor(topic.category)}
                  >
                    {topic.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-green-500">
                    <ArrowUp className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {topic.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </MagicCard>
  );
}