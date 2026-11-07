'use client';

import Link from 'next/link';
import Image from 'next/image';
import Loader from '@/components/UI/Loader/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/clientApi';
import css from './ProfilePage.module.css';

function ProfileClient() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getMe(),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}

export default ProfileClient;
