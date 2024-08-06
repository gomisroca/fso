import { gql} from '@apollo/client'
import { AUTHOR_DETAILS } from '../fragments'

export const ALL_AUTHORS = gql`
  query findAllAuthors {
    allAuthors {
     ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`