import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { connect } from "react-redux";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import BlogsSingle from "./components/BlogsSingle";

import Users from "./components/Users";

import {
  initializeAnecdotes,
  updateBlog,
  addNewBlog,
} from "./reducers/anecdoteReducer";

import { notificationChange } from "./reducers/notificationReducer";

const App = (props) => {
  // const [blogs, setBlogs] = useState([]);
  const blogs = props.anecdotes;

  const [newBlog, setNewBlog] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [readyToFetch, setreadyToFetch] = useState(false);

  useEffect(() => {
    setreadyToFetch(true);
    // ? This useeffect executes only on the initial load of the website)(after the components have been loaded).
  }, []);

  useEffect(() => {
    // user &&
    //   readyToFetch &&
    //   blogService
    //     .getAll()
    //     .then((initialNotes) =>
    //       setBlogs(initialNotes.sort((a, b) => b.likes - a.likes))
    //     ) &&
    //   setreadyToFetch(false);
    if (user && readyToFetch) {
      props.initializeAnecdotes();
      setreadyToFetch(false);
    }
    // console.log("useeffect executed..");
    // ? This useeffect executes only when one of varibales(user, readyToFetch) changes(after the components have been loaded).
  }, [user, readyToFetch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log('user:-',user)
      setUser(user);
      blogService.setToken(user.token);
      setreadyToFetch(true);
    }
  }, []);

  // const notesToShow = blogs;

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      props.notificationChange("Welcome to blogs application :)");
      setTimeout(() => {
        props.notificationChange("");
      }, 5000);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setreadyToFetch(true);
      setUsername("");
      setPassword("");
    } catch (exception) {
      props.notificationChange("Wrong credentials");
      setTimeout(() => {
        props.notificationChange("");
      }, 5000);
    }
  };

  const likePost = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    props.updateBlog(id, changedBlog);

    // console.log("2.blog.user.name: ", blogs[1].user.name);
    // console.log("blog.user.name: ", blogs[0].user);
  };

  const deletePost = (id) => {
    const [toBeDeletedBlog] = blogs.filter((b) => b.id === id);
    // window.confirm(toBeDeletedBlog.title)
    // const confirmed = window.confirm('Do you really want to delete:',toBeDeletedBlog.title,' by ',toBeDeletedBlog.author,' ?')
    // const confirmed = window.confirm('Do you really want to delete:',toBeDeletedBlog.title)
    const confirmed = window.confirm(
      `Do you really want to delete - ${toBeDeletedBlog.title} It was added by ${toBeDeletedBlog.author}.`
    );
    confirmed && blogService.deleteWithId(id).then((t) => console.log(t));
    setreadyToFetch(true);
  };

  const rows = () => {
    // console.log("blogs---", blogs);
    // console.log("");
    let c;
    return blogs.map((b) => (
      // <Blog
      //   key={b.id}
      //   title={b.title}
      //   author={b.author}
      //   likes={b.likes}
      //   url={b.url}
      //   user={b.user}
      //   id={b.id}
      //   loggedInUserId={user.id}
      //   likePost={() => likePost(b.id)}
      //   deletePost={() => deletePost(b.id)}
      // />

      // <BlogSingle blog={b} likePost={() => likePost(b.id)} deletePost={() => deletePost(b.id)} loggedInUserId={user.id} ></BlogSingle>

      <li key={b.id}>
        <Link to={`/blogs/${b.id}`}>
          {b.title === "" ? "No Title" : b.title}
        </Link>
      </li>
    ));
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const handleChangeBlog = (event) => {
    setNewBlog(event.target.value);
  };
  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value);
  };

  const noteFormRef = React.createRef();

  const addNote = (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();

    const noteObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    };

    props.addNewBlog(noteObject);

    props.notificationChange(
      `${newBlog} Author: ${newAuthor}, Url: ${newUrl}.<br></br>Thanks, ${user.name} for adding the blog.`
    );
    setNewBlog("");
    setNewAuthor("");
    setNewUrl("");
    setTimeout(() => {
      props.notificationChange("");
    }, 5000);
  };
  const padding = {
    padding: 5,
  };

  const topBody = () => (
    <div>
      <h1>Blogs</h1>

      <Notification message={props.notification} />
    </div>
  );

  const helloUser = () => (
    <span>
      {user === null ? (
        loginForm()
      ) : (
        <span>
          <span>Hello, {user.name}!</span>
          {/* <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              props.notificationChange("You are logged out.");
              setTimeout(() => {
                props.notificationChange("");
              }, 5000);
              setUser(null);
              setLoginVisible(false);
              // setBlogs([]);
            }}
          >
            Logout
          </button> */}
        </span>
      )}
    </span>
  );

  const blogForm_Blogs = () => {
    //this child component present => Adding new blog button(contained blogform) AND BlogForm AND All the BLOGS REPRESENTATION  with the help of rows()
    return (
      <div>
        {user === null ? null : (
          <div>
            <br></br>
            <br></br>
            <Togglable
              buttonLabel="Add new blog to the webiste"
              ref={noteFormRef}
            >
              <BlogForm
                onSubmit={addNote}
                valueBlog={newBlog}
                valueAuthor={newAuthor}
                valueUrl={newUrl}
                handleChangeBlog={handleChangeBlog}
                handleChangeAuthor={handleChangeAuthor}
                handleChangeUrl={handleChangeUrl}
              ></BlogForm>
            </Togglable>
            <h1>All Blogs: </h1>
            <ul>{rows()}</ul>
          </div>
        )}
      </div>
    );
  };

  const logoutElement = () => (
    <span style={{ marginInlineStart: "20px" }}>
      {user === null ? null : (
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            props.notificationChange("You are logged out.");
            setTimeout(() => {
              props.notificationChange("");
            }, 5000);
            setUser(null);
            setLoginVisible(false);
            // setBlogs([]);
          }}
        >
          Logout
        </button>
      )}
    </span>
  );

  return (
    <div>
      <BrowserRouter>
        <Link style={padding} to="/">
          Home
        </Link>

        <Link style={padding} to="/users">
          Users
        </Link>

        {helloUser()}

        {logoutElement()}

        {topBody()}

        <Switch>
          <Route path="/users">
            <Users />
          </Route>

          <Route path="/blogs/:id">
            {/* <BlogSingle blogs={blogs}></BlogSingle> */}
            <BlogsSingle
              blogs={blogs}
              likePost={(idc) => () => likePost(idc)}
              deletePost={(idc) => () => deletePost(idc)}
              loggedInUser={user}
            ></BlogsSingle>
          </Route>

          <Route style={padding} path="/">
            {blogForm_Blogs()}
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log('State of the store:',state)
  // console.log("state object:-", state.anecdotes);
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
  };
};

// export default App;
export default connect(mapStateToProps, {
  initializeAnecdotes,
  updateBlog,
  addNewBlog,
  notificationChange,
})(App);
