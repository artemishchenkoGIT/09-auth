import { Note, NoteTag } from '@/types/note';
import { $nextServer } from './api';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

interface NoteSearchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: NoteTag
): Promise<NoteSearchResponse> {
  const cookieStore = await cookies();
  const { data } = await $nextServer.get<NoteSearchResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      ...(search && { search }),
      ...(tag && { tag }),
      page,
      perPage: 10,
      sortBy: 'created',
    },
  });
  return data;
}

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await $nextServer.get<Note>('/notes/' + id, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await $nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const data = await $nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
