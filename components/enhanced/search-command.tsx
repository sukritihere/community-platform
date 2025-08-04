"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Hash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "user" | "post" | "hashtag";
  title: string;
  subtitle?: string;
  avatar?: string;
  timestamp?: Date;
}

export function SearchCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([
    {
      id: "1",
      type: "user",
      title: "Sarah Johnson",
      subtitle: "Product Designer at Tech Corp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    },
    {
      id: "2",
      type: "hashtag",
      title: "#webdevelopment",
      subtitle: "1.2k posts",
    },
    {
      id: "3",
      type: "post",
      title: "Building the future of web development",
      subtitle: "by Mike Chen",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const mockResults: SearchResult[] = [
      {
        id: "search-1",
        type: "user" as const,
        title: "Alex Rivera",
        subtitle: "Full Stack Developer",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      },
      {
        id: "search-2",
        type: "user" as const,
        title: "Emma Wilson",
        subtitle: "UX Designer",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      },
      {
        id: "search-3",
        type: "hashtag" as const,
        title: "#react",
        subtitle: "5.4k posts",
      },
      {
        id: "search-4",
        type: "post" as const,
        title: "The future of React development",
        subtitle: "by John Doe",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ].filter(
      (result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />;
      case "hashtag":
        return <Hash className="h-4 w-4" />;
      case "post":
        return <Clock className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-64 justify-start text-muted-foreground"
      >
        <Search className="h-4 w-4 mr-2" />
        <span>Search...</span>
        <Badge variant="secondary" className="ml-auto text-xs">
          ⌘K
        </Badge>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="shadow-2xl border-0 bg-background/95 backdrop-blur-md">
                <CardContent className="p-0">
                  <div className="flex items-center border-b px-4">
                    <Search className="h-4 w-4 text-muted-foreground mr-3" />
                    <Input
                      placeholder="Search users, posts, hashtags..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="border-0 focus-visible:ring-0 text-base"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {query.trim() === "" ? (
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                          Recent Searches
                        </h4>
                        {recentSearches.map((item) => (
                          <motion.div
                            key={item.id}
                            whileHover={{
                              backgroundColor: "hsl(var(--muted))",
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                          >
                            {item.type === "user" ? (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback className="text-xs">
                                  {item.title.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                {getIcon(item.type)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            {item.timestamp && (
                              <span className="text-xs text-muted-foreground">
                                {formatTime(item.timestamp)}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : results.length > 0 ? (
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                          Search Results
                        </h4>
                        {results.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                              backgroundColor: "hsl(var(--muted))",
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                          >
                            {item.type === "user" ? (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback className="text-xs">
                                  {item.title.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                {getIcon(item.type)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            {item.timestamp && (
                              <span className="text-xs text-muted-foreground">
                                {formatTime(item.timestamp)}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : query.trim() !== "" ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No results found for "{query}"</p>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
