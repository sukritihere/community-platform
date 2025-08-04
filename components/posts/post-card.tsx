'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MagicCard } from '@/components/ui/magic-card';
import { MoreHorizontal, Trash2, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

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

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { user, token } = useAuth();
  const isOwner = user?.id === post.author._id;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleDelete = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Post deleted successfully');
        onDelete?.();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete post error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? 'Removed like' : 'Post liked!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  return (
    <MagicCard className="w-full group" gradientColor="#8B5CF6">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href={`/profile/${post.author._id}`}>
              <Avatar className="h-12 w-12 border-2 border-primary/20 hover:border-primary transition-all duration-200 ring-2 ring-primary/10 hover:ring-primary/30">
                <AvatarImage src={post.author.profilePicture} alt={post.author.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {post.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </motion.div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Link 
                  href={`/profile/${post.author._id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors hover:underline"
                >
                  {post.author.name}
                </Link>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span className="text-xs">Public</span>
                </p>
              </div>
              
              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
                    <DropdownMenuItem 
                      onClick={handleDelete}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px]"
            >
              {post.content}
            </motion.p>
            
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-1">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`flex items-center gap-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 ${
                      isLiked ? 'text-red-600' : 'text-muted-foreground'
                    }`}
                  >
                    <motion.div
                      animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.div>
                    <span className="text-sm">{likeCount}</span>
                  </Button>
                </motion.div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/20 text-muted-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">Comment</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/20 text-muted-foreground"
                >
                  <Share className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </Button>
              </div>
              
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className={`hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-950/20 ${
                    isBookmarked ? 'text-yellow-600' : 'text-muted-foreground'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}