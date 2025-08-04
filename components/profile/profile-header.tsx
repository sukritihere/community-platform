'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { EditProfileDialog } from './edit-profile-dialog';

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture?: string;
  joinedAt: string;
}

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
  postCount: number;
}

export function ProfileHeader({ user, isOwnProfile, postCount }: ProfileHeaderProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-border">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  {isOwnProfile && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditDialogOpen(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                <p className="text-muted-foreground">{user.email}</p>
                
                {user.bio && (
                  <p className="text-foreground leading-relaxed">{user.bio}</p>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Joined {format(new Date(user.joinedAt), 'MMMM yyyy')}</span>
                </Badge>
                
                <Badge variant="outline">
                  {postCount} {postCount === 1 ? 'post' : 'posts'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isOwnProfile && (
        <EditProfileDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          user={user}
        />
      )}
    </>
  );
}