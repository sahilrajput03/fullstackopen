import React, { useState } from "react";
import { ALL_BOOKS, CREATE_BOOK } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    // Since we are adding the individual item to the cache ourself with update callback fn, we don't need to do refetchQueries.
    // refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      console.log("$error:-", error);
      //joni's error position..worked in way to knowing that schema has to be identical in both backend and front end query schema. Shit!(some bad taste!!:P)
      props.setError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      alert(` update method of useMutations --> ${JSON.stringify(response.data.addBook)}`);
      props.updateCacheWith(response.data.addBook);

      /*   
       Although, we fetch from the callback's store method, the current state and then add the addded book from the response.data , this seems
      good but this is somewhat redundant as we are doing the same thing in app.js file in the useSubscription hook; so we are just using that made
      up call back here too via passing it through the props through the component.
      */
      // const dataInStore = store.readQuery({ query: ALL_BOOKS });
      // console.log("dataInStore-->", dataInStore);
      // console.log("response.data-->", JSON.stringify(response.data));
      // store.writeQuery({
      //   query: ALL_BOOKS,
      //   data: { allBooks: dataInStore.allBooks.concat(response.data.addBook) },
      //   // data: {
      //   //   ...dataInStore,
      //   //   allBooks: [...dataInStore.allBooks, response.data.allBooks],
      //   // },
      //   // Above method uses destructuring and it sucks to be honest.
      // });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, published: Number(published), author, genres } });
    // console.log("add book...");

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuhtor(target.value)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
