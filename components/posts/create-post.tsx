"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MagicCard } from "@/components/ui/magic-card";
import { Sparkles } from "@/components/ui/sparkles";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { Send, Image, Smile, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePostProps {
  onPostCreated: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user, token } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please write something to share");
      return;
    }

    if (!token) {
      toast.error("Please log in to create a post");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://community-platform-production-8117.up.railway.app/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setContent("");
        toast.success("Post shared successfully!");
        onPostCreated();
      } else {
        toast.error(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Create post error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  const characterCount = content.length;
  const isOverLimit = characterCount > 280;
  const progressPercentage = (characterCount / 280) * 100;

  return (
    <MagicCard className="w-full" gradientColor="#8B5CF6">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles>Share your thoughts</Sparkles>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="h-12 w-12 border-2 border-primary/20 ring-2 ring-primary/10">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex-1 space-y-3">
              <motion.div
                animate={{
                  borderColor: isFocused
                    ? "hsl(var(--primary))"
                    : "hsl(var(--border))",
                  boxShadow: isFocused
                    ? "0 0 0 2px hsl(var(--primary) / 0.2)"
                    : "none",
                }}
                className="rounded-lg"
              >
                <Textarea
                  placeholder="What's on your mind? Share something amazing..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="min-h-[100px] resize-none border-0 p-4 focus-visible:ring-0 text-base bg-transparent"
                  maxLength={300}
                />
              </motion.div>

              {/* <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 px-2"
                  >
                    <Button variant="ghost" size="sm" type="button" className="text-muted-foreground hover:text-primary">
                      <Image className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" type="button" className="text-muted-foreground hover:text-primary">
                      <Smile className="h-4 w-4 mr-1" />
                      Emoji
                    </Button>
                    <Button variant="ghost" size="sm" type="button" className="text-muted-foreground hover:text-primary">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence> */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8">
                    <svg
                      className="w-8 h-8 transform -rotate-90"
                      viewBox="0 0 32 32"
                    >
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="hsl(var(--muted))"
                        strokeWidth="2"
                        fill="none"
                      />
                      <motion.circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke={
                          isOverLimit
                            ? "#ef4444"
                            : progressPercentage > 90
                            ? "#f59e0b"
                            : "hsl(var(--primary))"
                        }
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={87.96}
                        initial={{ strokeDashoffset: 87.96 }}
                        animate={{
                          strokeDashoffset:
                            87.96 - (87.96 * progressPercentage) / 100,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-xs font-medium ${
                          isOverLimit
                            ? "text-red-500"
                            : characterCount > 250
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {280 - characterCount}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting || !content.trim() || isOverLimit}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Sharing..." : "Share"}</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </MagicCard>
  );
}
