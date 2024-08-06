import { gql } from "@apollo/client"

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      id
    }
    genres
    id
  }
`

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    books {
      title
      published
      genres
      id
    }
    id
  }
`