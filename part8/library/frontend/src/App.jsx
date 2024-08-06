import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommended from "./components/Recommended";
import { BOOK_ADDED } from "./graphql/subscriptions/bookAdded.js";

const Notify = ({errorMessage}) => {
  if (!errorMessage) {
    return null  
  } 
  return (
    <div style={{color: 'red'}}>
      {errorMessage}  
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-token'))
  const client = useApolloClient()

  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null) 
    }, 10000)
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.newBook
      notify(`Book ${addedBook.title} added`)
    }
  })

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setError={notify} setToken={setToken} />
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("add")}>Add book</button>
        <button onClick={() => setPage("recommendations")}>Recommendations</button>
        <button onClick={logout}>Logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} />
      <Recommended show={page === "recommendations"} />
    </div>
  );
};

export default App;
