"use client";

import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export default function Home() {
  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(GET_BOOKS);
  const { data: helloData, loading: helloLoading } = useQuery(GET_HELLO);

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">GraphQL Test</h1>

        {/* Hello Query */}
        <section className="mb-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Hello Query</h2>
          {helloLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <p className="text-green-600">{helloData?.hello}</p>
          )}
        </section>

        {/* Books Query */}
        <section className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Books Query</h2>
          {booksLoading && <p className="text-gray-500">Loading...</p>}
          {booksError && <p className="text-red-500">Error: {booksError.message}</p>}
          {booksData && (
            <ul className="space-y-2">
              {booksData.books.map((book: { id: string; title: string; author: string }) => (
                <li key={book.id} className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
