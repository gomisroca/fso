import { gql} from '@apollo/client'
import { BOOK_DETAILS, AUTHOR_DETAILS } from './fragments'

export const ALL_AUTHORS = gql`
  query findAllAuthors {
    allAuthors {
     ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query findAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const USER_INFO = gql`
  query findUser {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    newBook {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`