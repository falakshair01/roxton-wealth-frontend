import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/store/slices/auth';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: User | null;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  user
}: UserAvatarProfileProps) {
  const fullName =
    user?.firstName || user?.lastName
      ? [user.firstName, user.lastName].filter(Boolean).join(' ')
      : '';

  const initials = (user?.firstName?.[0] || '') + (user?.lastName?.[0] || '');

  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={''} alt={fullName} />
        <AvatarFallback className='rounded-lg'>
          {initials || user?.email?.[0]?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>
            {fullName || user?.email || ''}
          </span>
          {user?.email && (
            <span className='text-muted-foreground truncate text-xs'>
              {user.email}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
