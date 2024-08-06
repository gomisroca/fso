import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries/allBooks.js'
import { USER_INFO } from '../graphql/queries/userInfo.js'
import { useEffect, useState } from 'react'

function RecommendedList({ user }) {
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre }
  })

  if (loading)  {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {data.allBooks.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}

function Recommended({ show }) {
  const { loading, data } = useQuery(USER_INFO)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me)
    }
  }, [data])

  if (!show) {
    return null
  }
  if (loading)  {
    return <div>Loading...</div>
  }
  if (user) {
    return (
      <div>
        <h2>Recommendations</h2>
        <p>Books in your favorite genre {user.favoriteGenre}</p>
        <RecommendedList user={user} />
      </div>
    )
  }
}

export default Recommended