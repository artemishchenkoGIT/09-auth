import { Note, CreateNote, NoteTag } from '@/types/note';
import { $nextServer } from './api';
import { User } from '@/types/user';
import { AuthRequest, CheckSessionRequest } from '@/types/requests';

interface NoteSearchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: NoteTag
): Promise<NoteSearchResponse> {
  const { data } = await $nextServer.get<NoteSearchResponse>('/notes', {
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
  const { data } = await $nextServer.get<Note>('/notes/' + id);
  return data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await $nextServer.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const { data } = await $nextServer.delete<Note>('/notes/' + id);
  return data;
}

export const register = async (payload: AuthRequest): Promise<User> => {
  const { data } = await $nextServer.post<User>('/auth/register', payload);
  return data;
};

export const login = async (payload: AuthRequest): Promise<User> => {
  const { data } = await $nextServer.post<User>('/auth/login', payload);
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await $nextServer.get<CheckSessionRequest>('/auth/session');

  return data.success;
};

export const logout = async (): Promise<void> => {
  await $nextServer.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const { data } = await $nextServer.get<User>('/users/me');

  return data;
};

export const updateMe = async (payload: {
  username: string;
}): Promise<User> => {
  const { data } = await $nextServer.patch('/users/me', payload);

  return data;
};
