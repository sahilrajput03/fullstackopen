import React, { useEffect, useState } from "react";

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  // const books = [] // Older style.
  const [books, setBooks] = useState(props.books);
  const [genre, setGenre] = useState(null);
  // setBooks(props.books);
  // useEffect(() => setBooks(props.books));

  // GETTING UNIQUE ARRAY FORM OLD ARRAY
  const allCommulativeGenres = books.reduce((acc, currVal) => acc.concat(currVal.genres), []);
  // const ss = [1,2].concat([3,4]) // Output:- ss => [1,2,3,4]
  // Flattening arrays using Javascript reduce method

  const uniqSet = [...new Set(allCommulativeGenres)];
  const uniqGenres = Array.from(uniqSet);
  // console.log("uniqgenres -->", uniqGenres);
  // console.log("current genre - ", genre);
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {genre
            ? books.map((a) => {
                if (a.genres.includes(genre))
                  return (
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                      <td>{a.genres.join(",  ").concat(".")}</td>
                    </tr>
                  );
                else {
                  return null;
                }
              })
            : books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                  <td>{a.genres.join(",  ").concat(".")}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {uniqGenres.map((item, indexx) => (
        <button key={indexx} onClick={() => setGenre(item)}>
          {item}
        </button>
      ))}
      {<button onClick={() => setGenre(null)}>all genres</button>}
    </div>
  );
};

export default Books;
