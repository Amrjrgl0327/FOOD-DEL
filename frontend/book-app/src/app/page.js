"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [books, setBooks] = useState();
  const endpoint = "http://localhost:8000/book";
  const options = [
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    },

    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    },
  ];

  console.log("working");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(endpoint, options[0]);

        const data = await response.json();
        console.log("data", data);
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    getBooks();
  }, []);
  return (
    <div className="border-2 w-100px h-50px flex flex-col text-2xl">
      {books?.map((book) => {
        return <div>{book.bookName} </div>;
      })}
    </div>
  );
}
