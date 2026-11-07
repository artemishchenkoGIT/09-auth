import { AuthRequest } from '@/types/requests';
import { User } from '@/types/user';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/types/apiError';
import { useAuthStore } from '@/lib/store/authStore';

export function useAuthHandleSubmit(
  cb: (payload: AuthRequest) => Promise<User>
): { handleSubmit: (formData: FormData) => void; error: string } {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  async function handleSubmit(formData: FormData) {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;

      const res = await cb(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  }

  return { handleSubmit, error };
}
