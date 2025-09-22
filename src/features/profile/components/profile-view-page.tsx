'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentUser, signOut } from '@/store/slices/auth';

export default function ProfileViewPage() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <div className='flex w-full justify-center p-6'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='flex flex-col items-center gap-2'>
          <Avatar className='h-20 w-20'>
            <AvatarFallback>
              {user?.firstName?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                'U'}
            </AvatarFallback>
          </Avatar>
          <CardTitle className='text-xl font-semibold'>
            {user?.firstName || user?.email || 'Your Profile'}
          </CardTitle>
          {user?.email && (
            <p className='text-muted-foreground text-sm'>{user.email}</p>
          )}
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Profile Info */}
          <div className='space-y-4'>
            <div>
              <Label>First Name</Label>
              <Input
                value={user?.firstName || ''}
                placeholder='First name'
                className='mt-2'
                readOnly
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={user?.lastName || ''}
                placeholder='Last name'
                className='mt-2'
                readOnly
              />
            </div>
            <div>
              <Label>About</Label>
              {/* <div className='mt-1 rounded-md border border-input bg-muted/50 px-3 py-2 text-sm'>
                  {user?.bio || ''}
                </div> */}
              <Textarea
                value={user?.bio || ''}
                placeholder='bio'
                className='mt-2'
                readOnly
              />
            </div>
          </div>
          {user?.email && (
            <div>
              <Label>Email</Label>
              <Input value={user.email} className='bg-muted/50 mt-1' readOnly />
            </div>
          )}

          {/* Security Section */}
          <div>
            <h3 className='mb-2 text-lg font-medium'>Security</h3>
            <Button variant='outline' className='w-full'>
              Change Password
            </Button>
          </div>

          {/* Session Section */}
          <div>
            <h3 className='mb-2 text-lg font-medium'>Active Session</h3>
            <p className='text-muted-foreground text-sm'>
              You are currently logged in on this device.
            </p>
            <Button
              variant='destructive'
              className='bg-primary mt-2 w-full'
              onClick={() => dispatch(signOut())}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
