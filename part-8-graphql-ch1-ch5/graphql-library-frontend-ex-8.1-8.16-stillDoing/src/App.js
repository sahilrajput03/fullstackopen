import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import ChangeBirth from "./components/ChangeBirth";
import Recommended from "./components/Recommended";
import LoginForm from "./components/LoginForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 20000, // querying server every two seconds..
  });
  const result2 = useQuery(ALL_BOOKS, {
    pollInterval: 20000, // querying server every two seconds..
  });

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    alert("updatecachewith section..");
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id);
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    // console.log("ALLBOKKKKS-->", JSON.stringify(dataInStore.allBooks));
    // console.log("ADDEDBOOOOKK-->", JSON.stringify(addedBook));
    console.log(JSON.stringify(dataInStore.allBooks.map((p) => p.id)));
    console.log(JSON.stringify(addedBook.id));
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      /* This section will only be executed when the person is added from somewhere else, bacause if it was added using this */
      /* browser setup, the person would have already added. */
      alert(`updatecachewith section.. executing the inner if block`);
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
    console.table(client.readQuery({ query: ALL_BOOKS }));
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`In useSubscription hook-> ${JSON.stringify(subscriptionData.data.bookAdded)}`);
      updateCacheWith(subscriptionData.data.bookAdded);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (result.loading || result2.loading) {
    return <div>Good things take time...:D</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("loginpage");
  };

  // useEffect(() => {
  //   if (result.data && result2.data) {
  //     setPerson(result.data.findPerson);
  //   }
  // }, [result.data]);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <h2>Login</h2>
  //       <LoginForm setToken={setToken} setError={notify} />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? <button onClick={() => setPage("loginpage")}>login</button> : null}

        {token ? <button onClick={() => setPage("add")}>add book</button> : null}
        {!token && page === "loginpage" ? (
          <div>
            <Notify errorMessage={errorMessage} />
            <h2>Login</h2>
            <LoginForm pagesetter={setPage} setToken={setToken} setError={notify} />
          </div>
        ) : null}
        {token ? <button onClick={logout}>logout</button> : null}
        {token ? <button onClick={() => setPage("recommended")}>recommended</button> : null}
      </div>

      <Authors authors={result.data.allAuthors} show={page === "authors"} />

      <Books books={result2.data.allBooks} show={page === "books"} />

      {token ? (
        <NewBook setError={notify} show={page === "add"} updateCacheWith={updateCacheWith} />
      ) : null}
      {page === "authors" ? <ChangeBirth authors={result.data.allAuthors}></ChangeBirth> : null}
      {page === "recommended" && token ? (
        <Recommended books={result2.data.allBooks}></Recommended>
      ) : null}
    </div>
  );
};

export default App;
