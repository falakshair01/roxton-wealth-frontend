// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { selectAuthStatus, selectAuthError, signUp } from '@/store/slices/auth';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';

// export default function SignUpViewPage() {
//   const dispatch = useAppDispatch();
//   const status = useAppSelector(selectAuthStatus);
//   const errorMessage = useAppSelector(selectAuthError);
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Email and password are required');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       // const result = await signUp.create({
//       //   email,
//       //   password
//       // });

//       // if (result.status === 'complete' && result.createdSessionId) {
//       //   await setActive({ session: result.createdSessionId });
//       //   alert('Registration successful! Redirecting to dashboard...');
//       //   router.push('/dashboard');
//       // } else {
//       //   setError('Unexpected state. Please try again.');
//       // }
//       await dispatch(signUp({ email, password })).unwrap();
//       router.push('/dashboard/client');
//     } catch (err: any) {
//       setError(
//         err?.errors?.[0]?.message || err?.message || 'Registration failed'
//       );
//     }
//   };

//   return (
//     <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
//       <div className='relative flex flex-col justify-center px-8 py-12 lg:px-24'>
//         <div className='text-md text-muted-foreground absolute top-10 right-10'>
//           Already have an account?{' '}
//           <Link href='/auth/sign-in' className='text-primary font-medium'>
//             Login
//           </Link>
//         </div>

//         <div className='w/full mx-auto flex max-w-md flex-col items-center justify-center space-y-6'>
//           <div className='text-center'>
//             <h1 className='mt-6 text-4xl'>Create your account</h1>
//             <p className='text-muted-foreground mt-2 text-sm'>
//               Please enter your details to register.
//             </p>
//           </div>

//           <form className='w-100 space-y-6' onSubmit={handleRegister}>
//             <div>
//               <Label htmlFor='email'>Email Address</Label>
//               <Input
//                 id='email'
//                 type='email'
//                 placeholder='you@example.com'
//                 className='mt-2 h-10 w-full text-sm'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete='email'
//               />
//             </div>

//             <div>
//               <Label htmlFor='password'>Password</Label>
//               <Input
//                 id='password'
//                 type='password'
//                 placeholder='••••••••'
//                 className='mt-2 h-10 w-full text-sm'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete='new-password'
//               />
//             </div>

//             <div>
//               <Label htmlFor='confirm'>Confirm Password</Label>
//               <Input
//                 id='confirm'
//                 type='password'
//                 placeholder='••••••••'
//                 className='mt-2 h-10 w-full text-sm'
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 autoComplete='new-password'
//               />
//             </div>

//             {error ||
//               (errorMessage && (
//                 <p className='text-sm text-red-500'>{error || errorMessage}</p>
//               ))}

//             <Button type='submit' className='bg-primary h-10 w-full'>
//               Register
//             </Button>
//           </form>
//         </div>

//         <footer className='text-muted-foreground absolute bottom-8 left-8 text-xs'>
//           © 2025, Studio Admin.
//         </footer>
//       </div>

//       <div className='m-4 hidden flex-col justify-between rounded-2xl bg-black p-8 text-white shadow-md lg:flex'>
//         <div>
//           <h2 className='text-lg font-semibold'>Studio Admin</h2>
//           <p className='text-sm text-gray-400'>
//             Design. Build. Launch. Repeat.
//           </p>
//         </div>
//         <div className='text-muted mt-8 flex justify-between gap-6 text-xs'>
//           <div>
//             <p className='font-semibold text-white'>Ready to launch?</p>
//             <p className='text-gray-400'>
//               Clone the repo, install dependencies, and your dashboard is live
//               in minutes.
//             </p>
//           </div>
//           <div>
//             <p className='font-semibold text-white'>Need help?</p>
//             <p className='text-gray-400'>
//               Check out the docs or open an issue on GitHub, community support
//               is just a click away.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectAuthStatus, selectAuthError, signUp } from '@/store/slices/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  bio?: string;
  form?: string;
};

export default function SignUpViewPage() {
  const dispatch = useAppDispatch();
  // const status = useAppSelector(selectAuthStatus);
  // const errorMessage = useAppSelector(selectAuthError);
  const status = useAppSelector((s) => s.auth.status);
  const errorMessage = useAppSelector((s) => s.auth.error);
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  const isLoading = status === 'loading';

  const validate = (): boolean => {
    const next: FieldErrors = {};

    // First Name
    if (!firstName.trim()) next.firstName = 'First name is required';
    else if (firstName.trim().length < 2)
      next.firstName = 'Minimum 2 characters';

    // Last Name
    if (!lastName.trim()) next.lastName = 'Last name is required';
    else if (lastName.trim().length < 2) next.lastName = 'Minimum 2 characters';

    // Email
    if (!email.trim()) next.email = 'Email is required';

    // Password
    const hasMin = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!password) next.password = 'Password is required';
    else if (!hasMin) next.password = 'At least 8 characters';
    else if (!(hasLetter && hasNumber))
      next.password = 'Use letters and numbers';

    // Confirm Password
    if (!confirmPassword) next.confirmPassword = 'Please confirm password';
    else if (password !== confirmPassword)
      next.confirmPassword = 'Passwords do not match';

    // Bio (optional)
    if (bio && bio.length > 240) next.bio = 'Bio must be under 240 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await dispatch(
        signUp({
          email: email.trim(),
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          bio: bio.trim()
        })
      ).unwrap();
      router.push('/dashboard/client');
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        form: err?.errors?.[0]?.message || err?.message || 'Registration failed'
      }));
    }
  };

  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='relative flex max-h-screen flex-col justify-center overflow-y-auto px-8 py-12 lg:px-24'>
        <div className='text-md text-muted-foreground absolute top-10 right-10'>
          Already have an account?{' '}
          <Link href='/auth/sign-in' className='text-primary font-medium'>
            Login
          </Link>
        </div>

        <div className='w/full mx-auto flex max-w-md flex-col items-center justify-center space-y-6'>
          <div className='mt-70 text-center'>
            <h1 className='mt-6 text-4xl'>Create your account</h1>
            <p className='text-muted-foreground mt-2 text-sm'>
              Please enter your details to register.
            </p>
          </div>

          <form
            className='w-100 space-y-6'
            onSubmit={handleRegister}
            noValidate
          >
            {/* First Name */}
            <div>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                id='firstName'
                type='text'
                placeholder='Enter your first name'
                className='mt-2 h-10 w-full text-sm'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete='given-name'
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className='mt-1 text-xs text-red-500'>{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                id='lastName'
                type='text'
                placeholder='Enter your last name'
                className='mt-2 h-10 w-full text-sm'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete='family-name'
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className='mt-1 text-xs text-red-500'>{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                className='mt-2 h-10 w-full text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className='mt-1 text-xs text-red-500'>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                className='mt-2 h-10 w-full text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='new-password'
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
              )}
              <p className='text-muted-foreground mt-1 text-[11px]'>
                Min 8 chars, include letters & numbers.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor='confirm'>Confirm Password</Label>
              <Input
                id='confirm'
                type='password'
                placeholder='••••••••'
                className='mt-2 h-10 w-full text-sm'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='new-password'
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor='bio'>Bio</Label>
              <textarea
                id='bio'
                placeholder='Write something about yourself'
                className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={240}
                aria-invalid={!!errors.bio}
              />
              <div className='mt-1 flex items-center justify-between'>
                {errors.bio ? (
                  <p className='text-xs text-red-500'>{errors.bio}</p>
                ) : (
                  <span className='text-muted-foreground text-xs'>
                    {bio.length}/240
                  </span>
                )}
              </div>
            </div>

            {(errors.form || errorMessage) && (
              <p className='text-sm text-red-500'>
                {errors.form || errorMessage}
              </p>
            )}

            <Button
              type='submit'
              className='bg-primary h-10 w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Registering…' : 'Register'}
            </Button>
          </form>
        </div>

        {/* <footer className='text-muted-foreground absolute bottom-8 left-8 text-xs'>
          © 2025, Studio Admin.
        </footer> */}
      </div>

      <div className='m-4 hidden flex-col justify-between rounded-2xl bg-black p-8 text-white shadow-md lg:flex'>
        <div>
          <h2 className='text-lg font-semibold'>Studio Admin</h2>
          <p className='text-sm text-gray-400'>
            Design. Build. Launch. Repeat.
          </p>
        </div>
        <div className='text-muted mt-8 flex justify-between gap-6 text-xs'>
          <div>
            <p className='font-semibold text-white'>Ready to launch?</p>
            <p className='text-gray-400'>
              Clone the repo, install dependencies, and your dashboard is live
              in minutes.
            </p>
          </div>
          <div>
            <p className='font-semibold text-white'>Need help?</p>
            <p className='text-gray-400'>
              Check out the docs or open an issue on GitHub, community support
              is just a click away.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
