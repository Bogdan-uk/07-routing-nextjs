'use client';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { Note } from '@/types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;
const BASE_URL = 'https://notehub-public.goit.study/api';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}
// export async function getTodos() {
//   const { data } = await axios.get<Todo[]>(
//     'https://jsonplaceholder.typicode.com/todos'
//   );
//   return data;
// }
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}
// export async function getTodo(todoId: Todo['id']) {
//   const { data } = await axios.get<Todo>(
//     `https://jsonplaceholder.typicode.com/todos/${todoId}`
//   );
//   return data;
// }
export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = '' } = params;

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search: search || undefined },
  });

  return data;
}
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
