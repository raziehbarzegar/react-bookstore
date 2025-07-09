import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000",
});

export async function getAllBooks() {
  const { data } = await client("/books");
  return data;
}
