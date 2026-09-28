"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState();
  const [bookName, setBookName] = useState("");
  const [fetched, setFetched] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [description, setDescription] = useState("");
  const endpoint = "http://localhost:8000/book";

  const addBook = async () => {
    try {
      const response = await axios.post(endpoint, {
        bookName: bookName,
        publishedAt: publishedAt,
        description: description,
      });
      if (!response.ok) {
        console.log("failed");
      }

      await getBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.get(endpoint);
      console.log("response", response);
      const data = await response.data;

      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      console.log("id", id);
      const response = await axios.delete(endpoint, { data: { id: id } });
      console.log("books", books);
      if (!response.ok) {
        console.log("error to delete book");
        await getBooks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, [fetched]);

  return (
    <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">My Library</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <input
            className="border-2 rounded-2xl w-full h-14 px-4 focus:outline-none focus:border-blue-500"
            placeholder="bookName"
            value={bookName}
            onChange={(Event) => setBookName(Event.target.value)}
          />
          <input
            className="border-2 rounded-2xl w-full h-14 px-4 focus:outline-none focus:border-blue-500"
            placeholder="publishedAt"
            value={publishedAt}
            onChange={(Event) => setPublishedAt(Event.target.value)}
          />
          <input
            className="border-2 rounded-2xl w-full h-14 px-4 focus:outline-none focus:border-blue-500"
            placeholder="description"
            value={description}
            onChange={(Event) => setDescription(Event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-600 text-white rounded-2xl w-full h-14 hover:bg-blue-700 transition"
            onClick={addBook}
          >
            add a book
          </button>
          <button
            className="bg-blue-600 text-white rounded-2xl w-full h-14 hover:bg-blue-700 transition"
            onClick={addBook}
          >
            add a publishedAt
          </button>
          <button
            className="bg-blue-600 text-white rounded-2xl w-full h-14 hover:bg-blue-700 transition"
            onClick={addBook}
          >
            add a description
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {books?.map((book) => (
          <div
            key={book.id}
            className="flex justify-between items-center border rounded-xl px-4 py-3 shadow-sm"
          >
            <span>{book.bookName}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transision"
              onClick={() => deleteBook(book._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
