import React, { useEffect } from "react";
import { ME } from "../queries";
import { useQuery } from "@apollo/client";

const Recommended = ({ books }) => {
  const result = useQuery(ME, {
    pollInterval: 20000, // querying server every two seconds..
  });

  let interestingBooks;
  if (result && result.data && result.data && result.data.me) {
    interestingBooks = books.filter((item) => item.genres.includes(result.data.me.favoriteGenre));
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("library-user-token");
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);

  if (result.loading) return <h1>loading...</h1>;
  else
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
              <th>genres</th>
            </tr>
            {interestingBooks.map((a, i) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td>{a.genres.join(",  ").concat(".")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Recommended;
