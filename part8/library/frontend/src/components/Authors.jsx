import { ALL_AUTHORS } from "../queries"
import { useQuery } from '@apollo/client'
import AuthorForm from "./AuthorForm"

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (results.loading)  {
    return <div>Loading...</div>
  }

  const authors = results.data.allAuthors
  console.log(authors)
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : '????'}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm authors={authors} />
    </div>
  )
}

export default Authors
