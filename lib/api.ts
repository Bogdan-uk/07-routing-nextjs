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
  tagName?: string;
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

export async function fetchNotes(
  currentPage: number,
  search?: string,
  tagName?: string
): Promise<FetchNotesResponse> {
  const getParams = {
    params: {
      search,
      page: currentPage,
      perPage: 12,
      tag: tagName,
    },
  };

  const { data } = await api.get<FetchNotesResponse>('/notes', getParams);

  return data;
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

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
