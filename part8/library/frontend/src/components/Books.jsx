import { useEffect, useState } from "react";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [findBooksByGenre, { loading: genreLoading, data: genreData }] = useLazyQuery(ALL_BOOKS, { fetchPolicy: "network-only" });
  const [books, setBooks] = useState([]);
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.newBook;
      setBooks(books.concat(addedBook));
    },
  });

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genreData) {
      setBooks(genreData.allBooks);
    }
  }, [genreData]);

  if (!props.show || books.length === 0) {
    return null;
  }

  if (result.loading || genreLoading) {
    return <div>Loading...</div>;
  }

  const { allBooks } = result.data;
  const genres = [...new Set(allBooks.flatMap((b) => b.genres))];

  const handleGenreClick = (genre) => {
    if (genre == 'all') {
      setBooks(allBooks);
      return;
    }
    findBooksByGenre({ variables: { genre: genre } });
  };

  return (
    <div>
      <h2>books</h2>
      <div>
        <button onClick={() => handleGenreClick('all')}>ALL</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre.toUpperCase()}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
