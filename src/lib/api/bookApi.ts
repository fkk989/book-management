import axios from "axios";
import type { Book } from "@/lib/type";

const API_BASE = import.meta.env.VITE_CRUD_BASE_API;

const BOOKS_URL = `${API_BASE}/books`;

export const createBook = async (book: Omit<Book, "_id">) => {
  const res = await axios.post<Book>(BOOKS_URL, book);
  return res.data;
};

export const getBooks = async () => {
  const res = await axios.get<Book[]>(BOOKS_URL);
  return res.data;
};

export const updateBook = async (id: string, book: Omit<Book, "_id">) => {
  const res = await axios.put(`${BOOKS_URL}/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await axios.delete(`${BOOKS_URL}/${id}`);
  return res.data;
};
