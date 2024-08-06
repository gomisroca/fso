import { gql} from '@apollo/client'
import { BOOK_DETAILS } from '../fragments'

export const ALL_BOOKS = gql`
  query findAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`