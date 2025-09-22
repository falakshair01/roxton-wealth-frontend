// 'use client';
// import { Button } from '@/components/ui/button';
// import { REHYDRATE } from 'redux-persist'; // for loaded flag after rehydrate
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import { UserAvatarProfile } from '@/components/user-avatar-profile';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { selectCurrentUser, signOut } from '@/store/slices/auth';
// // import { selectAuth, signOut } from '@/store/slices/auth';
// import { useRouter } from 'next/navigation';

// export function UserNav() {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector(selectCurrentUser);
//   console.log('UserNav authUser:', user);
//   const router = useRouter();

//   const handleSignOut = async () => {
//     await dispatch(logout());
//     router.push('/auth/sign-in');
//   };

//   if (user) {
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
//             <UserAvatarProfile user={user} />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           className='w-56'
//           align='end'
//           sideOffset={10}
//           forceMount
//         >
//           <DropdownMenuLabel className='font-normal'>
//             <div className='flex flex-col space-y-1'>
//               <p className='text-sm leading-none font-medium'>
//                 {user.fullName}
//               </p>
//               <p className='text-muted-foreground text-xs leading-none'>
//                 {user.email}
//               </p>
//             </div>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup>
//             <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
//               Profile
//             </DropdownMenuItem>
//             {/* <DropdownMenuItem>Billing</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>New Team</DropdownMenuItem> */}
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   }
// }

'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentUser, signOut } from '@/store/slices/auth';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(signOut());
    router.push('/auth/sign-in');
  };

  if (!user) return null;

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{displayName}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
