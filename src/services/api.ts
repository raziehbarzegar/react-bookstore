import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000",
});

export async function getAllBooks() {
  const { data } = await client("/books");
  return data;
}
export async function getBookById(id: string) {
  const { data } = await client(`/books/${id}`);
  return data;
}
